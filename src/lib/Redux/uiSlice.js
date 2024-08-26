import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    }
})

export const { toggleCreateTask, setFilter } = uiSlice.actions

export default uiSlice.reducer