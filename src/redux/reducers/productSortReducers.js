import * as actionTypes from "../actions/actionTypes";

const initState = null;

const productSortReducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.GET_CATRGOTY_PRODUCTS :
            return action.payload
        default :
            return state;
    }
}

export default productSortReducer;