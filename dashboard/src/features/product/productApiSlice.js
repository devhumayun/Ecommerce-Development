import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Create new Role
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
