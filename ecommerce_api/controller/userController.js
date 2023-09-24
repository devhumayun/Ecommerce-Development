import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { sendMail } from '../utils/sendMail.js'


/**
 * @route /api/v1/user
 * @desc get all user
 * @method get
 * @access public
*/

export const allUser = asyncHandler(async(req, res) => {
    const users = await User.find().populate("role")
    
    if(users.length > 0){
        res.status(200).json(users)
    }

})


/**
 * @route /api/v1/user
 * @desc create new user
 * @method post
 * @access public
*/

export const createUser = async (req, res) => {
    try {
            // get body data
    const { name, email, password, role} = req.body

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

    // send account login access to user
    sendMail({
        to: email,
        sub: "Account Access Info",
        msg: `Your account login access is email : ${email} & password : ${password}`,
      });
    
    // create user
    const user = await User.create({name, email, password:hash_pass,role})
    res.status(200).json({user, message: "User created successfull"})

    } catch (error) {
        console.log(error);
    }
};

/**
 * @route /api/v1/user/:id
 * @desc delete new user
 * @method Delete
 * @access public
*/
export const deleteUser = asyncHandler(async(req, res) => {
    const { id } = req.params
   
    // get permission
    const deletedUser  = await User.findByIdAndDelete(id)
   
    if(!deletedUser) {
        return res.status(400).json({ message : "User Not found"})
    }

    res.status(200).json({deletedUser, message:"User deleted successfull"})
})