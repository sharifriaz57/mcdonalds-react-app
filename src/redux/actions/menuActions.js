import * as actionTypes from "./actionTypes"

export const getAllMenuActionCreator = (payload) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.GET_ALL_MENU,
            payload: payload
        })
    }
}

export const getCurrentMenuActionCreator = (payload) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.GET_CURRENT_MENU,
            payload: payload
        })
    }
}
