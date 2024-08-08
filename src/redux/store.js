import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authslice'
import userReducer from './slices/userSlice'
import usersByTenantsReducer from "./slices/usersByTenantsSlice"
import singleUserReducer from "./slices/singleUserSlice"

export const store = configureStore({
    reducer : {
        auth : authReducer,
        user : userReducer,
        usersByTenants : usersByTenantsReducer,
        singleUser : singleUserReducer 
    }
})