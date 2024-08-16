import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tenants : null,
    status : 'idle',
    error : null
}

const tenatsSlice = createSlice({
    name : 'tenants',
    initialState,
    reducers : {
        fetchTentsByUserStart : (state, action) => {
            state.status = 'loading'
        },
        fetchTentsByUserSuccess : (state, action) => {
            state.status = 'success'
            state.tenants = action.payload
            state.error = null
        },
        fetchTentsByUserFail : (state, action) => {
            state.status = 'failed'
            state.error = action.payload
            state.tenants = null
        }
    }
})


const {
    
    fetchTentsByUserStart,
    fetchTentsByUserSuccess,
    fetchTentsByUserFail

} = tenatsSlice.actions

export default tenatsSlice.reducer