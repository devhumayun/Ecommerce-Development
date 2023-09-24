import asyncHandler from 'express-async-handler'
import Permissions from '../models/Permission.js'
import Permission from '../models/Permission.js'
import {slugify} from '../helpers/slug.js'

/**
 * @route /api/v1/permissions
 * @desc get all permissions
 * @method get
 * @access public
*/

export const allPermissions = asyncHandler(async(req, res) => {
    const permission = await Permissions.find()
    
    // if(permission.length == 0){
    //     return res.status(404).json({ message: "Permissions Not Found"})
    // }
    if(permission.length > 0){
        res.status(200).json(permission)
    }
})


/**
 * @route /api/v1/permissions
 * @desc create new permissions
 * @method post
 * @access public
*/

export const createPermission = asyncHandler(async(req, res) => {
    // get body data
    const { name } = req.body

    // validate input fields
    if( !name){
        return res.status(400).json({ message : "Name is requried"})
    }

    // check email is exists
    const checkName = await Permission.findOne({name})

    if(checkName) {
        return res.status(400).json({ message : "Name already exists"})
    }


    // create user
    const permission = await Permission.create({
        name: name,
        slug: slugify(name)
    })

    res.status(200).json({permission, message:"Permission created successfull"})

})

/**
 * @route /api/v1/permissions/:id
 * @desc get single permission
 * @method get
 * @access public
*/
export const getSinglePermission = asyncHandler(async(req, res) => {
    
    const { id } = req.params
   
    // get permission
    const permission  = await Permissions.findById(id)
   
    if(!permission) {
        return res.status(400).json({ message : "Permission Not found"})
    }

    res.status(200).json(permission)

})

/**
 * @route /api/v1/permissions/:id
 * @desc Delete Permission
 * @method get
 * @access public
*/
export const deletePermission = asyncHandler(async(req, res) => {
    
    const { id } = req.params
   
    // get permission
    const permission  = await Permissions.findByIdAndDelete(id)
   
    if(!permission) {
        return res.status(400).json({ message : "Permission Not found"})
    }

    res.status(200).json({permission, message: "Permission Deleted successfull"})

})


/**
 * @route /api/v1/permissions/:id
 * @desc Update Permission
 * @method get
 * @access public
*/
export const updatePermission = asyncHandler(async(req, res) => {
    
    const { id } = req.params
    const { name } = req.body

    if(!name){
        return res.status(400).json({ message : "Permission name is requried"})
    }
   
    // get permission
    const permission  = await Permissions.findByIdAndUpdate(id, {
        name: name,
        slug: slugify(name)
    })
   
    if(!permission) {
        return res.status(400).json({ message : "Permission Not found"})
    }

    res.status(200).json({permission, message: "Permission updated successfull"})

})


/**
 * @route /api/v1/permissions/:id
 * @desc Update Permission
 * @method get
 * @access public
*/
export const updatePermissionStatus = asyncHandler(async(req, res) => {
    
    const { id } = req.params
    const { status } = req.body

    // update permission
    const updatedPermissionStatus  = await Permissions.findByIdAndUpdate(id, {
        status : !status
    },{
        new: true
    })

    res.status(200).json({updatedPermissionStatus, message: "Status  updated successfull"})

})