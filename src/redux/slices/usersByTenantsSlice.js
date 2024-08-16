import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users : null,
    status : 'idle',
    error : null,
    message : null
}

const usersByTenantsSlice = createSlice({
    name : 'usersByTenants',
    initialState,
    reducers : {
        fetchUsersByTenantStart : (state, action) => {
            state.status = 'loading'
        },
        fetchUsersByTenantSuccess : (state, action) => {
            state.status = 'success'
            state.users = action.payload
            state.error = null
        },
        fetchUsersByTenantFail : (state, action) => {
            state.status = 'fail'
            state.users = null
            state.error = action.payload
        },
        deleteSingleUserStart : (state) => {
            state.status = 'loading'
        },
        deleteSingleUserSuccess : (state, action) => {
        state.status = 'success'
        state.message = action.payload
        state.error = null
        },
        deleteSingleUserFail : (state, action) => {
        state.status = 'fail'
        state.error = action.payload
        },
    }
})


export const {
    fetchUsersByTenantStart,
    fetchUsersByTenantSuccess,
    fetchUsersByTenantFail,
    deleteSingleUserStart,
    deleteSingleUserSuccess,
    deleteSingleUserFail
} = usersByTenantsSlice.actions

export default usersByTenantsSlice.reducer