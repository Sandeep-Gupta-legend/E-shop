import {configureStore} from '@reduxjs/toolkit'
import authReader from './slices/authSlice'
export const store= configureStore({
    reducer:{
        auth:authReader
    }
})