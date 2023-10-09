import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create new Brand
export const createBrand = createAsyncThunk(
  "product/createBrand",
  async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/brands`,
        data,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// get all brand
export const AllBrands = createAsyncThunk("product/AllBrands", async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/brands`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// get all brand
export const deleteBrand = createAsyncThunk(
  "product/deleteBrand",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/brands/${id}`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// brand status update
export const brandStatusUpdate = createAsyncThunk(
  "product/brandStatusUpdate",
  async ({ id, status }) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/brands/status/${id}`,
        {
          status,
        },
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// create tag
export const createTag = createAsyncThunk("product/createTag", async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/tags`,
      data,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// get all tags
export const getAllTags = createAsyncThunk("product/getAllTags", async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/tags`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// delete tag
export const deleteTag = createAsyncThunk("product/deleteTag", async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/v1/tags/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// tag status update
export const tagStatusUpdate = createAsyncThunk(
  "product/tagStatusUpdate",
  async ({ id, status }) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/tags/status/${id}`,
        {
          status,
        },
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// tag edit
export const tagDataEdit = createAsyncThunk(
  "product/tagDataEdit",
  async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/tags/${data.id}`,
        data,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// get all categories
export const getAllCategories = createAsyncThunk("product/getAllCategories", async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/category`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// create category
export const createCategory = createAsyncThunk("product/createCategory", async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/category`,
      data,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// delete category
export const deleteCategory = createAsyncThunk("product/deleteCategory", async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/v1/category/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});


// category status update
export const categoryStatusUpdate = createAsyncThunk(
  "product/categoryStatusUpdate",
  async ({ id, status }) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/category/status/${id}`,
        {
          status,
        },
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
