import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authslice'
import userReducer from './slices/userSlice'

export const store = configureStore({
    reducer : {
        auth : authReducer,
        user : userReducer
    }
})