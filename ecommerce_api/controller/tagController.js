import asyncHandler from 'express-async-handler'
import Permissions from '../models/Permission.js'
import Permission from '../models/Permission.js'
import {slugify} from '../helpers/slug.js'
import Brand from '../models/Brand.js'
import Tag from '../models/Tag.js'

/**
 * @route /api/v1/tag
 * @desc get all tag
 * @method get
 * @access public
*/

export const allTags = asyncHandler(async(req, res) => {
    const tag = await Tag.find()
    
    if(tag.length == 0){
        return res.status(404).json({ message: "Tag Not Found"})
    }
    if(tag.length > 0){
        return res.status(200).json(tag)
    }
})


/**
 * @route /api/v1/tag
 * @desc create new tag
 * @method post
 * @access admin
*/

export const createTag = asyncHandler(async(req, res) => {
    // get body data
    const { name } = req.body

    // validate input fields
    if( !name){
        return res.status(400).json({ message : "Name is requried"})
    }

    // check brand name is exists
    const checkName = await Brand.findOne({name})

    if(checkName) {
        return res.status(400).json({ message : "Name already exists"})
    }

    // create tag
    const tag = await Tag.create({
        name: name,
        slug: slugify(name)
    })

    res.status(200).json({tag, message:"Tag created successfull"})

})

/**
 * @route /api/v1/tag/:id
 * @desc get single tag
 * @method get
 * @access private
*/
export const getSingleTag = asyncHandler(async(req, res) => {
    
    const { id } = req.params
   
    // get permission
    const tag  = await Tag.findById(id)
   
    if(!tag) {
        return res.status(400).json({ message : "Tag Not found"})
    }

    res.status(200).json(tag)

})

/**
 * @route /api/v1/tag/:id
 * @desc Delete tag
 * @method get
 * @access private
*/
export const deleteTag = asyncHandler(async(req, res) => {
    
    const { id } = req.params
   
    // get permission
    const tag  = await Tag.findByIdAndDelete(id)
   
    if(!tag) {
        return res.status(400).json({ message : "Tag Not found"})
    }

    res.status(200).json({tag, message: "Tag Deleted successfull"})

})


/**
 * @route /api/v1/tag/:id
 * @desc Update tag
 * @method get
 * @access admin
*/
export const updateTag = asyncHandler(async(req, res) => {
    
    const { id } = req.params
    const { name } = req.body

    if(!name){
        return res.status(400).json({ message : "Tag name is requried"})
    }
   
    // get permission
    const tag  = await Tag.findByIdAndUpdate(id, {
        name: name,
        slug: slugify(name)
    })
   
    if(!tag) {
        return res.status(400).json({ message : "Tag Not found"})
    }

    res.status(200).json({ message: "Tag updated successfull"})

})


/**
 * @route /api/v1/tag/:id
 * @desc Update tag status
 * @method get
 * @access private
*/
export const updateTagStatus = asyncHandler(async(req, res) => {
    
    const { id } = req.params
    const { status } = req.body

    // update tag status
    const updatedTagStatus  = await Tag.findByIdAndUpdate(id, {
        status : !status
    },{
        new: true
    })

    res.status(200).json({updatedTagStatus, message: "Status  updated successfull"})

})