import { configureStore } from '@reduxjs/toolkit'
import appReducer from './appSlice'
import uiReducer from './uiSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    ui: uiReducer,
  },
})