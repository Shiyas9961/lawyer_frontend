import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : 'idle',
    error : null,
    message : null,
}


const userRegisterSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
      registerUserStart : (state) => {
        state.status = 'loading'
      },
      registerUserSuccess : (state, action) => {
        state.status = 'success'
        state.error = null
        state.message = action.payload
      },
      registerUserFail : (state, action) => {
        state.status = 'fail'
        state.error = action.payload
      },
    },
})

export const {
    registerUserStart,
    registerUserSuccess,
    registerUserFail
} = userRegisterSlice.actions

export default userRegisterSlice.reducer