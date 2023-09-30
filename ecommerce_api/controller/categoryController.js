import asyncHandler from "express-async-handler";
import Permissions from "../models/Permission.js";
import Permission from "../models/Permission.js";
import { slugify } from "../helpers/slug.js";
import Brand from "../models/Brand.js";
import Category from "../models/Category.js";
import { cloudFileDelete, cloudUpload } from "../utils/cloudUpload.js";
import { cloudinaryPhotoPublicId } from "../helpers/helpers.js";

/**
 * @route /api/v1/category
 * @desc get all category
 * @method get
 * @access public
 */

export const allCategories = asyncHandler(async (req, res) => {
  const category = await Category.find().populate([
    {
      path: "subCategory",
      populate: {
        path: "subCategory",
        populate: {
          path: "subCategory",
        },
      },
    },
    {
      path: "parentCategory",
      populate: {
        path: "parentCategory",
        populate: {
          path: "parentCategory",
        },
      },
    },
  ]);

  if (category.length == 0) {
    return res.status(404).json({ message: "Category Not Found" });
  }
  if (category.length > 0) {
    return res.status(200).json(category);
  }
});

/**
 * @route /api/v1/category
 * @desc create new category
 * @method post
 * @access admin
 */

export const createCategory = asyncHandler(async (req, res) => {
  // get body data
  const { name, parentCategory, icon } = req.body;

  // validate input fields
  if (!name) {
    return res.status(400).json({ message: "Name is requried" });
  }

  // check brand name is exists
  const checkName = await Category.findOne({ name });

  if (checkName) {
    return res.status(400).json({ message: "This category already exists" });
  }

  // category icon
  let catIcon = null
  if(icon){
    catIcon = icon
  }

  // category photo upload
  let catPhoto = null
  if(req.file){
    const categoryPhoto = await cloudUpload(req)
    catPhoto = categoryPhoto.secure_url
  }

  // create user
  const category = await Category.create({
    name: name,
    slug: slugify(name),
    icon: catIcon,
    parentCategory: parentCategory ? parentCategory : null,
    photo: catPhoto
  });

  if (parentCategory) {
    await Category.findByIdAndUpdate(parentCategory, {
      $push: { subCategory: category._id },
    });
  }

  res.status(200).json({ category, message: "Category created successfull" });
});

/**
 * @route /api/v1/category/:id
 * @desc get single category
 * @method get
 * @access public
 */
export const getSingleCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // get permission
  const category = await Category.findById(id).populate([
    {
      path: "subCategory",
      populate: {
        path: "subCategory",
        populate: {
          path: "subCategory",
        },
      },
    },
    {
      path: "parentCategory",
      populate: {
        path: "parentCategory",
        populate: {
          path: "parentCategory",
        },
      },
    },
  ]);

  if (!category) {
    return res.status(400).json({ message: "Category Not found" });
  }

  res.status(200).json(category);
});

/**
 * @route /api/v1/category/:id
 * @desc Delete category
 * @method get
 * @access private
 */
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // get permission
  const category = await Category.findByIdAndDelete(id);

  if(category.photo){
    const publicId = cloudinaryPhotoPublicId(category.photo)
    await cloudFileDelete(publicId)
  }


  if (!category) {
    return res.status(400).json({ message: "Category Not found" });
  }

  res.status(200).json({ category, message: "Category Deleted successfull" });
});

/**
 * @route /api/v1/category/:id
 * @desc Update category
 * @method get
 * @access admin
 */
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, parentCategory, icon } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Category name is requried" });
  }

  // updated category
  const updatedCat = await Category.findById(id)
  if (!updatedCat) {
    return res.status(400).json({ message: "Category Not found" });
  }

  // update category icon
  let updatedCatIcon = updatedCat.icon
  if(icon){
    updatedCatIcon = icon
  }

  // update parent category
  let parentCat = updatedCat.parentCategory
  if(parentCategory){
    parentCat = parentCategory
  }

  // category photo update
  let catPhoto = updatedCat.photo
  if(req.file){
    const publicId = cloudinaryPhotoPublicId(updatedCat.photo)
    await cloudFileDelete(publicId)
    const photo = await cloudUpload(req)
    catPhoto = photo.secure_url
  }

  updatedCat.name = name
  updatedCat.slug = slugify(name)
  updatedCat.icon = updatedCatIcon
  updatedCat.parentCategory = parentCat
  updatedCat.photo = catPhoto
  updatedCat.save()

  res.status(200).json({ message: "Category updated successfull" });
});
