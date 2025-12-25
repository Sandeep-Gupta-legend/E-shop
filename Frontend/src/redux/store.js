import {configureStore} from '@reduxjs/toolkit'
import authReader from './slices/authSlice'
import cartReducer from "./slices/cartSlice";

import productReducer from './slices/productSlice'
export const store= configureStore({
    reducer:{
        auth:authReader,
        products: productReducer,
        cart: cartReducer,
    }
})