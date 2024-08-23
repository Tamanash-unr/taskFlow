import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    createTaskUI: false
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleCreateTask: (state, action) => {
            state.createTaskUI = action.payload
        }
    }
})

export const { toggleCreateTask } = uiSlice.actions

export default uiSlice.reducer