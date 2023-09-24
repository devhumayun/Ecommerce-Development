import asyncHandler from 'express-async-handler'
import Permissions from '../models/Permission.js'
import Permission from '../models/Permission.js'
import {slugify} from '../helpers/slug.js'
import Brand from '../models/Brand.js'

/**
 * @route /api/v1/brand
 * @desc get all brand
 * @method get
 * @access public
*/

export const allBrands = asyncHandler(async(req, res) => {
    const brand = await Brand.find()
    
    if(brand.length == 0){
        return res.status(404).json({ message: "Brand Not Found"})
    }
    if(brand.length > 0){
        return res.status(200).json(brand)
    }
})


/**
 * @route /api/v1/brand
 * @desc create new brand
 * @method post
 * @access admin
*/

export const createBrand = asyncHandler(async(req, res) => {
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


    // create user
    const brand = await Brand.create({
        name: name,
        slug: slugify(name)
    })

    res.status(200).json({brand, message:"brand created successfull"})

})

/**
 * @route /api/v1/brand/:id
 * @desc get single brand
 * @method get
 * @access private
*/
export const getSingleBrand = asyncHandler(async(req, res) => {
    
    const { id } = req.params
   
    // get permission
    const brand  = await Brand.findById(id)
   
    if(!brand) {
        return res.status(400).json({ message : "Brand Not found"})
    }

    res.status(200).json(brand)

})

/**
 * @route /api/v1/brand/:id
 * @desc Delete brand
 * @method get
 * @access private
*/
export const deleteBrand = asyncHandler(async(req, res) => {
    
    const { id } = req.params
   
    // get permission
    const brand  = await Brand.findByIdAndDelete(id)
   
    if(!brand) {
        return res.status(400).json({ message : "brand Not found"})
    }

    res.status(200).json({brand, message: "Brand Deleted successfull"})

})


/**
 * @route /api/v1/brand/:id
 * @desc Update brand
 * @method get
 * @access admin
*/
export const updateBrand = asyncHandler(async(req, res) => {
    
    const { id } = req.params
    const { name } = req.body

    if(!name){
        return res.status(400).json({ message : "Brand name is requried"})
    }
   
    // get permission
    const brand  = await Brand.findByIdAndUpdate(id, {
        name: name,
        slug: slugify(name)
    })
   
    if(!brand) {
        return res.status(400).json({ message : "Brand Not found"})
    }

    res.status(200).json({ message: "Brand updated successfull"})

})


/**
 * @route /api/v1/brand/:id
 * @desc Update brand
 * @method get
 * @access private
*/
export const updateBrandStatus = asyncHandler(async(req, res) => {
    
    const { id } = req.params
    const { status } = req.body

    // update permission
    const updatedBrandStatus  = await Brand.findByIdAndUpdate(id, {
        status : !status
    },{
        new: true
    })

    res.status(200).json({updatedBrandStatus, message: "Status  updated successfull"})

})