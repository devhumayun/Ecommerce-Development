import express from 'express'
import tokenVerify from '../middlewares/tokenVerify.js';
import { allProducts, createProduct, deleteProduct, getSingleProduct, updateProduct } from '../controller/productController.js';
import { productPhoto } from '../utils/multer.js';


const router = express.Router();

router.use(tokenVerify)

// students route manage
router.route('/').get(allProducts).post(productPhoto, createProduct)
router.route('/:id').get(getSingleProduct).delete(deleteProduct).put(updateProduct).patch(updateProduct)


export default router