import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

/**
 * @route /api/v1/auth/login
 * @desc create new user
 * @method post
 * @access public
*/

export const login = asyncHandler(async(req, res) => {
    // get body data
    const { email, password } = req.body

    // validate input fields
    if(!email || !password){
        return res.status(400).json({ message : "All fields are requried"})
    }

     // check user email is exists
     const login_user = await User.findOne({email}).populate("role")
     if(!login_user) {
         return res.status(400).json({ message : "User not found"})
     }

    //  check password
    const check_pass = await bcrypt.compare(password, login_user.password)
    if(!check_pass) {
        return res.status(400).json({ message : "Wrong password"})
    }

    // access token
    const token = jwt.sign({email}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_SECRET_EXPAIR
    })

    // access token
    const refresh_token = jwt.sign({email}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_SECRET_EXPAIR
    })

    res.cookie("accessToken", token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.APP_ENV == "Development" ?  false : true,
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,

    })

    res.status(200).json({
        token,
        user: login_user,
        message: "Login successfull"
    })
})



/**
 * @route /api/v1/auth/logout
 * @desc logout
 * @method post
 * @access public
*/

export const logout = asyncHandler(async(req, res) => {
   res.clearCookie("accessToken")
   res.status(200).json({ message: "Logout successfull"})
})


/**
 * @route /api/v1/auth/register
 * @desc create new user
 * @method post
 * @access public
*/

export const register = asyncHandler(async(req, res) => {
    // get body data
    const { name, email, password } = req.body

    // validate input fields
    if( !name || !email || !password){
        return res.status(400).json({ message : "All fields are requried"})
    }

    // check email is exists
    const userEmail = await User.findOne({email})

    if(userEmail) {
        return res.status(400).json({ message : "Email already exists"})
    }

    // hash password
    const hash_pass = await bcrypt.hash(password, 10)
    
    // create user
    const user = await User.create({ name, email, password:hash_pass })

    res.status(200).json({
        user,
        message: "User created successfull"
    })

})


/**
 * @route /api/v1/auth/me
 * @desc get logged in user
 * @method get
 * @access public
*/

export const loggedInUser = asyncHandler(async(req, res) => {
    
    res.json(req.me)

})