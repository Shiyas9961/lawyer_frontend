import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authslice'

export const store = configureStore({
    reducer : {
        auth : authReducer
    }
})