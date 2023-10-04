import { createSlice } from "@reduxjs/toolkit";
import { createBrand } from "./productApiSlice";


// create a auth slice
const productSlice = createSlice({
    name: "product",
    initialState: {
        product: null,
        brand: null,
        category: null,
        tag: null,
        message: null,
        error: null,
    },
    reducers: {
        setMessageEmpty: (state,action) => {
            state.message = null 
            state.error = null 
         }
    },
    extraReducers: (builder) => {
        builder.addCase(createBrand.rejected, (state, action) => {
            state.error = action.error.message
        })
        .addCase(createBrand.fulfilled, (state, action) => {
            state.brand = state.brand ?? []
            state.brand.push(action.payload.brand)
            state.message = action.payload.message
        })
    }
})

// selector


// actions
export const { setMessageEmpty } = productSlice.actions

// export
export default productSlice.reducer