import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    status : 'idle',
    error : null,
    message : null
}


const singleUserSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
      fetchSingleUserStart : (state) => {
        state.status = 'loading'
      },
      fetchSingleUserSuccess : (state, action) => {
        state.status = 'success'
        state.user = action.payload
        state.error = null
      },
      fetchSingleUserFail : (state, action) => {
        state.status = 'fail'
        state.user = null
        state.error = action.payload
      },
      editSingleUserStart : (state) => {
        state.status = 'loading'
      },
      editSingleUserSuccess : (state, action) => {
        state.status = 'success'
        state.message = action.payload
        state.error = null
      },
      editSingleUserFail : (state, action) => {
        state.status = 'fail'
        state.user = null
        state.error = action.payload
    },
  }
})


export const {
  editSingleUserStart, 
  editSingleUserSuccess, 
  editSingleUserFail,
  fetchSingleUserFail,
  fetchSingleUserStart,
  fetchSingleUserSuccess
} = singleUserSlice.actions

export default singleUserSlice.reducer