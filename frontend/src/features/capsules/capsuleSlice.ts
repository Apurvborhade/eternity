import { createSlice } from "@reduxjs/toolkit";
const capsuleSlice = createSlice({
    name: 'capsule',
    initialState: {
        capsules: [],
        filteredCapsules:[],
        searchTerm: "",
    },
    reducers: {
        getCapsule: (state, action) => {
            state.capsules = action.payload
            state.filteredCapsules = action.payload
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload; // Set the search term
        },
        filterCapsule:(state,action) => {
            if(action.payload.length === 0) {
                state.filteredCapsules = state.capsules
            }
            state.filteredCapsules = state.capsules.filter((capsule) => capsule.title.toLowerCase().includes(action.payload.toLowerCase()))
        }
    },
})

export const { getCapsule,setSearchTerm,filterCapsule } = capsuleSlice.actions
export default capsuleSlice.reducer
