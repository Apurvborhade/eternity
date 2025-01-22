import { createSlice } from "@reduxjs/toolkit";
const capsuleSlice = createSlice({
    name: 'capsule',
    initialState: [],
    reducers: {
        getCapsule: (state, action) => {
           return action.payload
            
        },
        getCapsuleDetails: (state, action) => {
            return action.payload
            
        }
    }
})

export const { getCapsule, getCapsuleDetails } = capsuleSlice.actions
export default capsuleSlice.reducer
