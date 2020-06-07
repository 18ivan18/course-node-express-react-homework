import { createSlice } from '@reduxjs/toolkit'

const AuthSlice = createSlice({
    name: 'authentication',
    initialState: {
        loggedIn: false,
        user: null,
        adminMode: false
    },
    reducers: {
        setAuth: (state, input) => {
            state.loggedIn = input.payload.loggedIn;
            state.user = input.payload.user
        },
        logout: (state) => {
            state.loggedIn = false
            state.user = null
            state.adminMode = false
        }
    }

})
const { actions, reducer } = AuthSlice

export const selectUsers = state => state.initialState
export const { setAuth, logout } = actions
export default reducer