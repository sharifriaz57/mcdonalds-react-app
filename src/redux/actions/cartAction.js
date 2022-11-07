import * as actionTypes from "./actionTypes";

export const addToCartAction = (product) => {
    return (dispatch) => {
        
        dispatch({
            type: actionTypes.ADD_TO_CART,
            payload: {
                details: product
            }
        })
    }
}

export const addToCartInputAction = (product, inputValue) => {
    return (dispatch) => {
        
        dispatch({
            type: actionTypes.ADD_TO_CART_INPUT,
            payload: {
                qty: inputValue,
                details: product
            }
        })
    }
}

export const removeFromCartAction = (product) => {
    return (dispatch) => {
        
        dispatch({
            type: actionTypes.REMOVE_FROM_CART,
            payload: {
                details: product
            }
        })
    }
}

export const deleteFromCartAction = (product) => {
    return (dispatch) => {
        
        dispatch({
            type: actionTypes.DELETE_FROM_CART,
            payload: {
                details: product
            }
        })
    }
}

export const clearCartAction = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.CLEAR_CART
        })
    }
}
