import { combineReducers } from "redux";
import cartReducer from "./cartReducers";
import currentMenuReducer from "./currentMenuReducer";
import menuReducer from "./menuReducer";
import productReducer from "./productReducers";

const rootReducer = combineReducers({
    menus: menuReducer,
    currentMenu: currentMenuReducer,
    products: productReducer,
    cart: cartReducer,
});

export default rootReducer;