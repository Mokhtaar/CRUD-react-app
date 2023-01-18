import { configureStore } from '@reduxjs/toolkit'
import postReducer from "./postSlice"
import userReducer from './loggedInUserSlice'


export const store = configureStore({
  reducer: {
    posts : postReducer,
    user: userReducer
  },
})