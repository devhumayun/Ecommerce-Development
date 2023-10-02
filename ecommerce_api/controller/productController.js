import asyncHandler from "express-async-handler";
import { slugify } from "../helpers/slug.js";
import Product from "../models/Product.js";


/**
 * @route /api/v1/product
 * @desc get all product
 * @method get
 * @access public
 */

export const allProducts = asyncHandler(async (req, res) => {
  const product = await Product.find();

  if (product.length == 0) {
    return res.status(404).json({ message: "Product Not Found" });
  }
  if (product.length > 0) {
    return res.status(200).json(brand);
  }
});

/**
 * @route /api/v1/product
 * @desc create new product
 * @method post
 * @access admin
 */

export const createProduct = asyncHandler(async (req, res) => {
  // get body data
  const { name, productType, productSimple, productVariable, productGroup, productExternal, shortDesc, longDesc } = req.body;

  // validate input fields
  if (!name) {
    return res.status(400).json({ message: "Name is requried" });
  }

  // check brand name is exists
  const checkName = await Product.findOne({ name });

  if (checkName) {
    return res.status(400).json({ message: "Product already exists with this name!" });
  }

  // create user
  const product = await Product.create({
    name: name,
    slug: slugify(name),
    productType,
    productSimple: productType === "simple" ? productSimple : null,
    productVariable: productType === "variable" ? productVariable : null,
    productGroup: productType === "group" ? productGroup : null,
    productExternal: productType === "external" ? productExternal : null,
    shortDesc,
    longDesc
  });

  res.status(200).json({ product, message: "Product created successfull" });
});

/**
 * @route /api/v1/product/:id
 * @desc get single product
 * @method get
 * @access private
 */
export const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // get permission
  const product = await Product.findById(id);

  if (!product) {
    return res.status(400).json({ message: "Product Not found" });
  }

  res.status(200).json(product);
});

/**
 * @route /api/v1/product/:id
 * @desc Delete product
 * @method get
 * @access private
 */
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // delete brand
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return res.status(400).json({ message: "Product Not found" });
  }

  res.status(200).json({ product, message: "Product Deleted successfull" });
});

/**
 * @route /api/v1/product/:id
 * @desc Update product
 * @method get
 * @access admin
 */
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Product name is requried" });
  }
  res.status(200).json({ message: "Brand updated successfull" });
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
