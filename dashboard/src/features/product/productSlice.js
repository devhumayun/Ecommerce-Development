import { createSlice } from "@reduxjs/toolkit";
import {
  AllBrands,
  brandStatusUpdate,
  createBrand,
  deleteBrand,
} from "./productApiSlice";

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
    loader: false,
  },
  reducers: {
    setMessageEmpty: (state, action) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBrand.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.brand = state.brand ?? [];
        state.brand.push(action.payload.brand);
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(AllBrands.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(AllBrands.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(AllBrands.fulfilled, (state, action) => {
        state.brand = action.payload;
        state.loader = false;
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.brand = state.brand.filter(
          (data) => data._id != action.payload.brand._id
        );
        state.message = action.payload.message;
      })
      .addCase(brandStatusUpdate.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(brandStatusUpdate.fulfilled, (state, action) => {
        state.brand[
          state.brand.findIndex((data) => data._id === action.payload.brand._id)
        ] = action.payload.brand;
        state.message = action.payload.message;
      });
  },
});

// selector

// actions
export const { setMessageEmpty } = productSlice.actions;

// export
export default productSlice.reducer;
