import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

const user = Cookies.get('user')

const userSlice = createSlice({
    name: 'user',
    initialState: user ?
        JSON.parse(user)
        : null,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload
            return action.payload
        },
        removeUser: (state) => {
            return null
        }
    }
})

export const { addUser,removeUser } = userSlice.actions
export default userSlice.reducer