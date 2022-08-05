import * as repository from "../../repository/Repository";
import * as actionTypes from "./actionTypes";

export const addToCartAction = (id) => {
    return async (dispatch) => {
        const response = await repository.getDetailsByProductId(id);
        dispatch({
            type: actionTypes.ADD_TO_CART,
            payload: {
                details: response.status === 200 ? response.data : {}
            }
        })
    }
}

export const addToCartInputAction = (id, qty) => {
    return async (dispatch) => {
        const response = await repository.getDetailsByProductId(id);
        dispatch({
            type: actionTypes.ADD_TO_CART_INPUT,
            payload: {
                qty: qty,
                details: response.status === 200 ? response.data : {}
            }
        })
    }
}

export const removeFromCartAction = (id) => {
    return async (dispatch) => {
        const response = await repository.getDetailsByProductId(id);
        dispatch({
            type: actionTypes.REMOVE_FROM_CART,
            payload: {
                details: response.status === 200 ? response.data : {}
            }
        })
    }
}

export const deleteFromCartAction = (id) => {
    return async (dispatch) => {
        const response = await repository.getDetailsByProductId(id);
        dispatch({
            type: actionTypes.DELETE_FROM_CART,
            payload: {
                details: response.status === 200 ? response.data : {}
            }
        })
    }
}

export const clearCartAction = (id) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.CLEAR_CART
        })
    }
}
