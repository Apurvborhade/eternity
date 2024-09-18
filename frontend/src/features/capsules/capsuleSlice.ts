import { createSlice } from "@reduxjs/toolkit";
const capsuleSlice = createSlice({
    name: 'capsule',
    initialState: [],
    reducers: {
        getCapsule: (state, action) => {
            return action.payload
        }
    }
})

export const { getCapsule } = capsuleSlice.actions
export default capsuleSlice.reducer
