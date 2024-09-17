import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isMobile: false,
    createTaskUI: false,
    taskFilter: "all_tasks"
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleCreateTask: (state, action) => {
            state.createTaskUI = action.payload
        },
        setFilter: (state, action) => {
            state.taskFilter = action.payload
        },
        setIsMobile: (state, action) => {
            state.isMobile = action.payload
        }
    }
})

export const { toggleCreateTask, setFilter, setIsMobile } = uiSlice.actions

export default uiSlice.reducer