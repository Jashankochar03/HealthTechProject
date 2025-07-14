import {combineReducers} from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice"
import diseaseReducer from "../slices/diseaseSlice"
import viewCourseReducer from "../slices/viewCourseSlice"
import blogReducer from "../slices/blogSlice"

const rootReducer  = combineReducers({
    auth: authReducer,
    profile:profileReducer,
    cart:cartReducer,
    disease:diseaseReducer,
    viewCourse:viewCourseReducer,
    blog:blogReducer
})

export default rootReducer