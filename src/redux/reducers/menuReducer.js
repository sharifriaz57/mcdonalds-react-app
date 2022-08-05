import * as actionTypes from "../actions/actionTypes";

const initState = [];

const menuReducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.GET_ALL_MENU:
            return action.payload
        default : 
            return state;
    }
}

export default menuReducer;