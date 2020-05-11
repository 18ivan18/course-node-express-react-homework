import { createSlice } from '@reduxjs/toolkit'

const UsersSlice = createSlice({
    name: 'users',
    initialState: [{
        userID: 123,
        name: "Adam",
        email: "admin@admin.ad",
        password: "admin",
        gender: "M",
        role: "admin",
        profilePicture: "https://cdn0.iconfinder.com/data/icons/man-user-human-profile-avatar-person-business/100/10B-1User-512.png",
        description: "I'm the admin",
        accountValidity: "active",
        registrationDate: Date.now(),
        lastModificationDate: Date.now()
    }],
    reducers: {
        addNewUser: (state, input) => {
            state.push(input.payload)
        },
        removeUser: (state, userID) => {
            return state.filter((user) => user.userID !== userID.payload);
        },
        editUser: (state, editedUser) => {
            return state.map((user) => user.userID === editedUser.payload.userID ? editedUser.payload : user)
        }
    }

})
const { actions, reducer } = UsersSlice

export const selectUsers = state => state.initialState
export const { addNewUser, removeUser, editUser } = actions
export default reducer