import express from 'express'
import { allUser, createUser, deleteUser } from '../controller/userController.js';
import tokenVerify from '../middlewares/tokenVerify.js';

const router = express.Router();

router.use(tokenVerify)

// students route manage
router.route('/').get(allUser).post(createUser)
router.route("/:id").delete(deleteUser)

export default router