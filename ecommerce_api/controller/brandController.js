import asyncHandler from "express-async-handler";
import Permissions from "../models/Permission.js";
import Permission from "../models/Permission.js";
import { slugify } from "../helpers/slug.js";
import Brand from "../models/Brand.js";
import { cloudFileDelete, cloudUpload } from "../utils/cloudUpload.js";
import { cloudinaryPhotoPublicId } from "../helpers/helpers.js";

/**
 * @route /api/v1/brand
 * @desc get all brand
 * @method get
 * @access public
 */

export const allBrands = asyncHandler(async (req, res) => {
  const brand = await Brand.find();

  if (brand.length == 0) {
    return res.status(404).json({ message: "Brand Not Found" });
  }
  if (brand.length > 0) {
    return res.status(200).json(brand);
  }
});

/**
 * @route /api/v1/brand
 * @desc create new brand
 * @method post
 * @access admin
 */

export const createBrand = asyncHandler(async (req, res) => {
  // get body data
  const { name } = req.body;

  // validate input fields
  if (!name) {
    return res.status(400).json({ message: "Name is requried" });
  }

  // check brand name is exists
  const checkName = await Brand.findOne({ name });

  if (checkName) {
    return res.status(400).json({ message: "Name already exists" });
  }

  let brandlogo = null
  if(req.file){
    const logo = await cloudUpload(req);
    brandlogo = logo
  }
  // create user
  const brand = await Brand.create({
    name: name,
    slug: slugify(name),
    logo: brandlogo.secure_url ? brandlogo.secure_url : null,
  });

  res.status(200).json({ brand, message: "brand created successfull" });
});

/**
 * @route /api/v1/brand/:id
 * @desc get single brand
 * @method get
 * @access private
 */
export const getSingleBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // get permission
  const brand = await Brand.findById(id);

  if (!brand) {
    return res.status(400).json({ message: "Brand Not found" });
  }

  res.status(200).json(brand);
});

/**
 * @route /api/v1/brand/:id
 * @desc Delete brand
 * @method get
 * @access private
 */
export const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // delete brand
  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) {
    return res.status(400).json({ message: "brand Not found" });
  }
  // delete logo
  const publicId = cloudinaryPhotoPublicId(brand.logo)
  cloudFileDelete(publicId)

  res.status(200).json({ brand, message: "Brand Deleted successfull" });
});

/**
 * @route /api/v1/brand/:id
 * @desc Update brand
 * @method get
 * @access admin
 */
export const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Brand name is requried" });
  }
  const updatedBrand = await Brand.findById(id)
  if (!updatedBrand) {
    return res.status(400).json({ message: "Brand data not found" });
  }

  let updatedLogo = updatedBrand.logo
  if(req.file){
    const publicId = cloudinaryPhotoPublicId(updatedBrand.logo)
    cloudFileDelete(publicId)
    const logo = await cloudUpload(req)
    updatedLogo = logo.secure_url
  }

  updatedBrand.name = name
  updatedBrand.logo = updatedLogo
  updatedBrand.save()


  res.status(200).json({brand: updateBrand, message: "Brand updated successfull" });
});

/**
 * @route /api/v1/brand/:id
 * @desc Update brand
 * @method get
 * @access private
 */
export const updateBrandStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // update permission
  const updatedBrandStatus = await Brand.findByIdAndUpdate(
    id,
    {
      status: !status,
    },
    {
      new: true,
    }
  );

  res
    .status(200)
    .json({ updatedBrandStatus, message: "Status  updated successfull" });
});
