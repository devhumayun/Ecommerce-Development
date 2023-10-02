import express from 'express'
import tokenVerify from '../middlewares/tokenVerify.js';
import { allProducts, createProduct, deleteProduct, getSingleProduct, updateProduct } from '../controller/productController.js';


const router = express.Router();

router.use(tokenVerify)

// students route manage
router.route('/').get(allProducts).post(createProduct)
router.route('/:id').get(getSingleProduct).delete(deleteProduct).put(updateProduct).patch(updateProduct)


export default router