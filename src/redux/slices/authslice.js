import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";


const initialState = {
    token : null,
    user : null
}

const authslice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        setToken : (state, action) => {
            state.token = action.payload
            state.user = jwtDecode(action.payload.idToken)
        },
        clearAuth : (state, action) => {
            state.token = null
            state.user = null
        }
    }
})

export const {
    setToken,
    clearAuth
} = authslice.actions

export default authslice.reducer