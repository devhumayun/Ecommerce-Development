import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Create new Brand
export const createBrand = createAsyncThunk("product/createBrand", async(data) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/v1/brands`, data,{
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})

// get all brand
export const AllBrands = createAsyncThunk("product/AllBrands", async() => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/brands`,{
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})

// get all brand
export const deleteBrand = createAsyncThunk("product/deleteBrand", async(id) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/v1/brands/${id}`,{
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})


// brand status update
export const brandStatusUpdate = createAsyncThunk("product/brandStatusUpdate", async({id, status}) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/v1/brands/status/${id}`,{
            status
        },{
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})
