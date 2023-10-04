import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import authReducer from '../features/auth//authSlice'
import userReducer from '../features/user/userSlice'
import productReducer from '../features/product/productSlice'

// create store
const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        product: productReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true
})

// export
export default store