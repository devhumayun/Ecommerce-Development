import { createSlice } from "@reduxjs/toolkit";
import {
  AllBrands,
  brandStatusUpdate,
  categoryStatusUpdate,
  createBrand,
  createCategory,
  createTag,
  deleteBrand,
  deleteCategory,
  deleteTag,
  getAllCategories,
  getAllTags,
  tagDataEdit,
  tagStatusUpdate,
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
      })
      .addCase(createTag.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(createTag.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.tag = state.tag ?? [];
        state.tag.push(action.payload.tag);
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(getAllTags.fulfilled, (state, action) => {
        state.tag = action.payload;
      })
      .addCase(deleteTag.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.tag = state.tag.filter(
          (data) => data._id != action.payload.tag._id
        );
        state.message = action.payload.message;
      })
      .addCase(tagStatusUpdate.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(tagStatusUpdate.fulfilled, (state, action) => {
        state.tag[
          state.tag.findIndex((data) => data._id === action.payload.tag._id)
        ] = action.payload.tag;
        state.message = action.payload.message;
      })
      .addCase(tagDataEdit.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(tagDataEdit.fulfilled, (state, action) => {
        state.tag[
          state.tag.findIndex((data) => data._id === action.payload.tag._id)
        ] = action.payload.tag;
        state.message = action.payload.message;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.category = action.payload.category
      })
      .addCase(createCategory.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.category = state.category ?? [];
        state.category.push(action.payload.category);
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.category = state.category.filter(
          (data) => data._id != action.payload.category._id
        );
        state.message = action.payload.message;
      })
      .addCase(categoryStatusUpdate.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(categoryStatusUpdate.fulfilled, (state, action) => {
        state.category[
          state.category.findIndex((data) => data._id === action.payload.category._id)
        ] = action.payload.category;
        state.message = action.payload.message;
      });
  },
});

// selector

// actions
export const { setMessageEmpty } = productSlice.actions;

// export
export default productSlice.reducer;
