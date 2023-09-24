import asyncHandler from 'express-async-handler'
import jwt, { decode } from 'jsonwebtoken'
import User from '../models/User.js'

// token verify
const tokenVerify = (req, res, next) => {

    // const auth_header = req.headers.authorization || req.headers.Authorization

    const accessToken = req.cookies.accessToken

    if(!accessToken){
        return res.status(400).json({ message : "Unauthorized"})
    }


    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET,  asyncHandler(async(err, decode) => {
        if(err){
            return res.status(400).json({ message : "Invalid Token"})
        }

        const me = await User.findOne({ email: decode.email}).select("-password").populate('role')

        req.me = me

        next()
    }))

}

// export
export default tokenVerify