import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    status : 'idle',
    error : null,
    message : null
}


const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
      fetchUserStart : (state) => {
        state.status = 'loading'
      },
      fetchUserSuccess : (state, action) => {
        state.status = 'success'
        state.user = action.payload
      },
      fetchUserFail : (state, action) => {
        state.status = 'fail'
        state.user = null
        state.error = action.payload
      },
      editUserStart : (state) => {
        state.status = 'loading'
      },
      editUserSuccess : (state, action) => {
        state.status = 'success'
        state.message = action.payload
      },
      editUserFail : (state, action) => {
        state.status = 'fail'
        state.user = null
        state.error = action.payload
      }
    },
})


export const {
  editUserStart, 
  editUserSuccess, 
  editUserFail,
  fetchUserFail,
  fetchUserStart,
  fetchUserSuccess
} = userSlice.actions

export default userSlice.reducer