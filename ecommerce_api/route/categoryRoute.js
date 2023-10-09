import express from 'express'
import tokenVerify from '../middlewares/tokenVerify.js';
import { allCategories, createCategory, deleteCategory, getSingleCategory, updateCatStatus, updateCategory } from '../controller/categoryController.js';
import { categoryPhoto } from '../utils/multer.js';

const router = express.Router();

router.use(tokenVerify)

// students route manage
router.route('/').get(allCategories).post(categoryPhoto, createCategory)
router.route('/:id').get(getSingleCategory).delete(deleteCategory).put(categoryPhoto, updateCategory).patch(categoryPhoto, updateCategory)

router.post("/status/:id", updateCatStatus)

export default router