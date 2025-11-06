import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice' 
import profileReducer from '../slices/profileSlice'
import cartReducer from '../slices/cartSlice'

const rootReducer = combineReducers({
    // auth reducer
    auth: authReducer,
    // profile reducer
    profile: profileReducer,
    // cart reducer
    cart: cartReducer
})

export default rootReducer