import express from 'express'
import tokenVerify from '../middlewares/tokenVerify.js';
import { allBrands, createBrand, deleteBrand, getSingleBrand, updateBrand, updateBrandStatus } from '../controller/brandController.js';
import { brandLogo } from '../utils/multer.js';

const router = express.Router();

router.use(tokenVerify)

// students route manage
router.route('/').get(allBrands).post(brandLogo, createBrand)
router.route('/:id').get(getSingleBrand).delete(deleteBrand).put(updateBrand).patch(updateBrand)

router.post("/status/:id", updateBrandStatus)

export default router