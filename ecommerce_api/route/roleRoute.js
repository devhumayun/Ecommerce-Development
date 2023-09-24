import express from 'express'
import tokenVerify from '../middlewares/tokenVerify.js';
import { allRoles, createRole, deleteRole, getSingleRole, updateRole, updateRoleStatus } from '../controller/roleController.js';


const router = express.Router();

router.use(tokenVerify)

// students route manage
router.route('/').get(allRoles).post(createRole)
router.route('/:id').get(getSingleRole).delete(deleteRole).put(updateRole).patch(updateRole)

router.post('/status/:id', updateRoleStatus)

export default router