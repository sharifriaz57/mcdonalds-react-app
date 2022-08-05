import * as actionTypes from "../actions/actionTypes";

const initState = null;

const productReducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.GET_CATRGOTY_PRODUCTS :
            let products = action.payload;

            if (localStorage.getItem('productSortOption') !== null) {
                const currentSortOption = localStorage.getItem('productSortOption');
                
                switch(currentSortOption) {
                    case "name" :
                        products.sort((a, b) => a.name > b.name ? 1 : -1);
                        break;
                    case "priceLowest" :
                        products.sort((a, b) => a.price - b.price);
                        return products;
                    case "priceHighest" :
                        products.sort((a, b) => b.price - a.price);
                        return products;
                    default :
                        return products
                }  
            }
            return products
        default :
            return state;
    }
}

export default productReducer;