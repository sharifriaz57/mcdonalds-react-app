import * as actionTypes from "../actions/actionTypes";

const initState = {};

const currentMenuReducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.GET_CURRENT_MENU:
            return action.payload
        default : 
            return state;
    }
}

export default currentMenuReducer;