import express from 'express'
import tokenVerify from '../middlewares/tokenVerify.js';
import { allPermissions, createPermission, deletePermission, getSinglePermission, updatePermission, updatePermissionStatus } from '../controller/permissionsController.js';

const router = express.Router();

router.use(tokenVerify)

// students route manage
router.route('/').get(allPermissions).post(createPermission)
router.route('/:id').get(getSinglePermission).delete(deletePermission).put(updatePermission).patch(updatePermission)

router.post("/status/:id", updatePermissionStatus)

export default router