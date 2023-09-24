import express from 'express'
import tokenVerify from '../middlewares/tokenVerify.js';
import { allCategories, createCategory, deleteCategory, getSingleCategory, updateCategory } from '../controller/categoryController.js';

const router = express.Router();

router.use(tokenVerify)

// students route manage
router.route('/').get(allCategories).post(createCategory)
router.route('/:id').get(getSingleCategory).delete(deleteCategory).put(updateCategory).patch(updateCategory)

export default router