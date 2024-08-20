import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    createTask: false
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setCreateTask: (state, action) => {
            state.createTask = action.payload
        }
    }
})

export const { setCreateTask } = uiSlice.actions

export default uiSlice.reducer