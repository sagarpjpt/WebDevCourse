import { combineReducers } from "@reduxjs/toolkit";
import profileReducer from '../slices/profileSlice'
import cartReducer from '../slices/cartSlice'
import courseReducer from "../slices/courseSlice"

const rootReducer = combineReducers({
    // profile reducer
    profile: profileReducer,
    // cart reducer
    cart: cartReducer,
    // course reducer
    course: courseReducer
})

export default rootReducer