import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users : null,
    status : 'idle',
    error : null
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
        },
        fetchUsersByTenantFail : (state, action) => {
            state.status = 'fail'
            state.users = null
            state.error = action.payload
        }
    }
})


export const {
    fetchUsersByTenantStart,
    fetchUsersByTenantSuccess,
    fetchUsersByTenantFail
} = usersByTenantsSlice.actions

export default usersByTenantsSlice.reducer