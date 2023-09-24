import { createSlice } from "@reduxjs/toolkit";
import { createUser, getLoggedInUser, loginUser, logoutUser } from "./authApiSlice";


// create a auth slice
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")): null,
        message: null,
        error: null
    },
    reducers: {
        setMessageEmpty: (state,action) => {
           state.message = null 
           state.error = null 
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.rejected, (state, action) => {
            state.error = action.error.message
        })
        .addCase(createUser.fulfilled, (state,action) => {
            state.message = action.payload.message
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.error = action.error.message
        })
        .addCase(loginUser.fulfilled, (state,action) => {
            state.message = action.payload.message
            state.user = action.payload.user
            localStorage.setItem("user", JSON.stringify(action.payload.user))
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.error = action.error.message
        })
        .addCase(logoutUser.fulfilled, (state,action) => {
            state.message = action.payload.message
            state.user = null
            localStorage.removeItem("user")
        })
        .addCase(getLoggedInUser.rejected, (state, action) => {
            state.error = action.error.message
        })
        .addCase(getLoggedInUser.fulfilled, (state,action) => {
            state.user = action.payload
        })

    }
})

// selector
export const getAuthData = state => state.auth

// actions
export const { setMessageEmpty } = authSlice.actions

// export
export default authSlice.reducer