import asyncHandler from "express-async-handler";
import { slugify } from "../helpers/slug.js";
import Role from "../models/Role.js";

/**
 * @route /api/v1/role
 * @desc get all role
 * @method get
 * @access public
 */

export const allRoles = asyncHandler(async (req, res) => {
  const role = await Role.find();

  if (role.length > 0) {
    res.status(200).json(role);
  }
});

/**
 * @route /api/v1/role
 * @desc create new role
 * @method post
 * @access public
 */

export const createRole = asyncHandler(async (req, res) => {
  // get body data
  const { name, permissions } = req.body;

  // validate input fields
  if (!name) {
    return res.status(400).json({ message: "Name is requried" });
  }

  // check name is exists
  const checkName = await Role.findOne({ name });

  if (checkName) {
    return res.status(400).json({ message: "Name already exists" });
  }

  // create user
  const role = await Role.create({
    name: name,
    slug: slugify(name),
    permissions: permissions,
  });

  res.status(200).json({ role, message: "Role created successfull" });
});

/**
 * @route /api/v1/role/:id
 * @desc get single role
 * @method get
 * @access public
 */
export const getSingleRole = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // get permission
  const role = await Role.findById(id);

  if (!role) {
    return res.status(400).json({ message: "Role Not found" });
  }

  res.status(200).json(role);
});

/**
 * @route /api/v1/role/:id
 * @desc Delete role
 * @method get
 * @access public
 */
export const deleteRole = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // get permission
  const role = await Role.findByIdAndDelete(id);

  if (!role) {
    return res.status(400).json({ message: "Role Not found" });
  }

  res.status(200).json({ role, message: "Role deleted successfull" });
});

/**
 * @route /api/v1/role/:id
 * @desc Update role
 * @method get
 * @access public
 */
export const updateRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, permissions } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Role name is requried" });
  }

  // get permission
  const role = await Role.findByIdAndUpdate(id, {
    name: name,
    slug: slugify(name),
    permissions: permissions,
  });

  // if(!role) {
  //     return res.status(400).json({ message : "Role Not found"})
  // }

  res.status(200).json({ role, message: "Role updated" });
});

/**
 * @route /api/v1/role/status/:id
 * @desc Update role status
 * @method post
 * @access public
 */
export const updateRoleStatus = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // update permission
    const role = await Role.findByIdAndUpdate(
      id,
      {
        status: !status,
      },
      {
        new: true,
      }
    );

    res.status(200).json({ role, message: " Status updated" });
  } catch (error) {
    console.log(error.message);
  }
});
