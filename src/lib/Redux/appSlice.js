import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: false,
    tasks: null,
    filter: {
        todo: true,
        inProgress: true,
        completed: true
    },
}


export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            if(action.payload.uid){
                state.user = action.payload
            }
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        updateTasks: (state, action) => {
            state.tasks = action.payload
        },
    }
})

export const { updateUser, setLoading, updateTasks } = appSlice.actions

export default appSlice.reducer