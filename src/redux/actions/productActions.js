import * as actionTypes from "./actionTypes";

export const getCategoryProductActionCreator = (payload) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.GET_CATRGOTY_PRODUCTS,
            payload: payload
        })
    }
}
