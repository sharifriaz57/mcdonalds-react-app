import { useState } from "react";
import * as actionTypes from '../redux/actions/actionTypes';
import * as actionCreators from '../redux/actions/actions';
import { bindActionCreators } from 'redux';
import { useDispatch } from "react-redux";

const useCartAction = () => {
    const [cartLoading, setCartLoading] = useState({id: null, loading: false});
    const dispatch = useDispatch();
    const { addToCartAction, addToCartInputAction, removeFromCartAction, deleteFromCartAction } = bindActionCreators(actionCreators.cartActions, dispatch);


    const invokeCartAction = (product, cartActionType, inputValue) => {
        setCartLoading({id: product.id, loading: true});

        switch (true) {
            case cartActionType === actionTypes.ADD_TO_CART:
                    addToCartAction(product);
                break;
            case cartActionType === actionTypes.ADD_TO_CART_INPUT:
                    addToCartInputAction(product, inputValue);
                break;
            case cartActionType === actionTypes.REMOVE_FROM_CART:
                    removeFromCartAction(product);
                break;
            case cartActionType === actionTypes.DELETE_FROM_CART:
                    deleteFromCartAction(product);
                break;
            default:
                break;
        }
    
        setCartLoading({id: null, loading: false});
    }

    return { cartLoading, invokeCartAction }
}

export default useCartAction;