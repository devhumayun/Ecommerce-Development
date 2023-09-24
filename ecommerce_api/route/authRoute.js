import express from 'express'
import { login, logout, register, loggedInUser } from '../controller/authController.js';
import tokenVerify from '../middlewares/tokenVerify.js';

const router = express.Router();

// students route manage
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/register').post(register)


router.get('/me', tokenVerify, loggedInUser)

export default router