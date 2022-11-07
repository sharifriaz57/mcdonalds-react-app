import * as actionTypes from "../actions/actionTypes";

let initState = {
    cartItems: 0,
    uniqueItems: 0,
    uniqueItemsId: [],
    itemsInfo: [],
    subTotal: 0,
    tax: 0,
    total: 0
};
const localCartData = localStorage.getItem('cartData');
if (localCartData) {
    initState = JSON.parse(localCartData);
}

const cartReducer = (state = initState, action) => {
    const product = action.payload ? action.payload.details : null;

    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            const uniqueItemsId = [...state.uniqueItemsId];
            const itemsInfo = [...state.itemsInfo];

            if (uniqueItemsId.indexOf(product.id) === -1) {
                uniqueItemsId.push(product.id);
                const itemObj = {
                    id: product.id,
                    details: product,
                    qty: 1,
                }

                itemsInfo.push(itemObj);
            } else {
                itemsInfo.forEach(info => {
                    if (info.id === product.id) {
                        info.qty += 1;
                    }
                })
            }

            const subTotal = state.subTotal + Number(product.price);
            const calculateTax = (Number(product.price) * Number(product.vat)) / 100;
            const totalTax = state.tax + calculateTax;
            const tax = Math.round((totalTax + Number.EPSILON) * 100) / 100;
            const total = subTotal + tax;

            const addToCartObj = {
                cartItems: state.cartItems + 1,
                uniqueItems: uniqueItemsId.length,
                uniqueItemsId: uniqueItemsId,
                itemsInfo: itemsInfo,
                subTotal: subTotal,
                tax: tax,
                total: total
            }
            localStorage.setItem('cartData', JSON.stringify(addToCartObj));
            
            return addToCartObj;
        case actionTypes.ADD_TO_CART_INPUT:
            const itemsInfoInput = [...state.itemsInfo];
            const uniqueItemInput = [...state.uniqueItemsId];
            let cartItemQtyWithoutThisInput = 0;
            let subTotalWithoutThisInput = 0;
            let totalTaxWithoutThisInput = 0;
            const itemsQty = Number(action.payload.qty);
            
            itemsInfoInput.forEach((info, key) => {
                if (info.id === product.id) {
                    cartItemQtyWithoutThisInput = state.cartItems - info.qty;
                    subTotalWithoutThisInput = state.subTotal - (info.qty * info.details.price);
                    totalTaxWithoutThisInput = state.tax - (( (Number(info.details.price) * Number(info.details.vat)) / 100) * info.qty);
                    info.qty = itemsQty;
                    
                    if (itemsQty === 0) {
                        itemsInfoInput.splice(key, 1)
                        uniqueItemInput.splice(key, 1)
                    }
                }
            })

            const subTotalInput = subTotalWithoutThisInput + Number(product.price * itemsQty);
            const calculateTaxInput = (Number(product.price) * Number(product.vat)) / 100;
            const totalTaxInput = totalTaxWithoutThisInput + (calculateTaxInput * itemsQty);
            const taxInput = Math.round((totalTaxInput + Number.EPSILON) * 100) / 100;
            const totalInput = subTotalInput + taxInput;

            const addToCartInputObj = {
                cartItems: cartItemQtyWithoutThisInput + itemsQty,
                uniqueItems: uniqueItemInput.length,
                uniqueItemsId: uniqueItemInput,
                itemsInfo: itemsInfoInput,
                subTotal: subTotalInput,    
                tax: taxInput,
                total: totalInput
            }
            localStorage.setItem('cartData', JSON.stringify(addToCartInputObj));

            return addToCartInputObj;
        case actionTypes.REMOVE_FROM_CART:
            let uniqueItemsIdRemoveCart = [...state.uniqueItemsId];
            let itemsInfoRemoveCart = [...state.itemsInfo];

            itemsInfoRemoveCart.forEach(item => {
                if (item.id === product.id) {
                    if (item.qty > 1)
                        item.qty -= 1;
                    else {
                        uniqueItemsIdRemoveCart = uniqueItemsIdRemoveCart.filter(id => id !== item.id)
                        itemsInfoRemoveCart = itemsInfoRemoveCart.filter(currentItem => currentItem.id !== item.id)
                    }
                }
            })

            const subTotalAfterRemove = state.subTotal - Number(product.price);
            const calculateTaxAfterRemove = (Number(product.price) * Number(product.vat)) / 100;
            const totalTaxAfterRemove = state.tax - calculateTaxAfterRemove;
            const taxAfterRemove = Math.round((totalTaxAfterRemove + Number.EPSILON) * 100) / 100;
            const totalAfterRemove = subTotalAfterRemove + taxAfterRemove;

            const removeFromCartObj = {
                cartItems: state.cartItems - 1,
                uniqueItems: uniqueItemsIdRemoveCart.length,
                uniqueItemsId: uniqueItemsIdRemoveCart,
                itemsInfo: itemsInfoRemoveCart,
                subTotal: subTotalAfterRemove,
                tax: taxAfterRemove,
                total: totalAfterRemove
            }
            localStorage.setItem('cartData', JSON.stringify(removeFromCartObj));

            return removeFromCartObj;
        case actionTypes.DELETE_FROM_CART:
            let uniqueItemsIdDeleteCart = [...state.uniqueItemsId];
            let itemsInfoDeleteCart = [...state.itemsInfo];
            let cartItems = state.cartItems;
            let clickedItemCount = 0;

            itemsInfoDeleteCart.forEach(item => {
                if (item.id === product.id) {
                    clickedItemCount = item.qty;
                    cartItems = cartItems - item.qty;
                    uniqueItemsIdDeleteCart = uniqueItemsIdDeleteCart.filter(id => id !== item.id)
                    itemsInfoDeleteCart = itemsInfoDeleteCart.filter(currentItem => currentItem.id !== item.id)
                }
            })

            const subTotalAfterDelete = state.subTotal - (Number(product.price) * clickedItemCount);
            const calculateTaxAfterDelete = (Number(product.price) * Number(product.vat)) / 100;
            const totalTaxAfterDelete = state.tax - (calculateTaxAfterDelete * clickedItemCount);
            const taxAfterDelete = Math.round((totalTaxAfterDelete + Number.EPSILON) * 100) / 100;
            const totalAfterDelete = subTotalAfterDelete + taxAfterDelete;

            const deleteFromCartObj = {
                cartItems: cartItems,
                uniqueItems: uniqueItemsIdDeleteCart.length,
                uniqueItemsId: uniqueItemsIdDeleteCart,
                itemsInfo: itemsInfoDeleteCart,
                subTotal: subTotalAfterDelete,
                tax: taxAfterDelete,
                total: totalAfterDelete
            }
            localStorage.setItem('cartData', JSON.stringify(deleteFromCartObj));

            return deleteFromCartObj;
        case actionTypes.CLEAR_CART:
            localStorage.clear();

            return {
                cartItems: 0,
                uniqueItems: 0,
                uniqueItemsId: [],
                itemsInfo: [],
                subTotal: 0,
                tax: 0,
                total: 0
            };
        default:
            return state;
    }
}

export default cartReducer;