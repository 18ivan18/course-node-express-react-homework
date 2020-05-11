import { createSlice } from '@reduxjs/toolkit'

const AuthSlice = createSlice({
    name: 'authentication',
    initialState: {
        loggedIn: false,
        user: null,
        adminMode: false
    },
    reducers: {
        login: (state, input) => {
            input.payload.users.map((user) => {
                if(user.email === input.payload.email && user.password === input.payload.password) {
                    state.loggedIn = true
                    state.user = user
                    input.payload.cb()
                }
            })
        },
        logout: (state) => {
            state.loggedIn = false
            state.user = null
            state.adminMode = false
        },
        adminMode: (state) => {
            state.adminMode = !state.adminMode
        }
    }

})
const { actions, reducer } = AuthSlice

export const selectUsers = state => state.initialState
export const { login, logout, adminMode } = actions
export default reducer