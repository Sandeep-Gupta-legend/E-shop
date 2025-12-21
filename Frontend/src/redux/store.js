import {configureStore} from '@reduxjs/toolkit'
import authReader from './slices/authSlice'

import productReducer from './slices/productSlice'
export const store= configureStore({
    reducer:{
        auth:authReader,
        products: productReducer,
    }
})