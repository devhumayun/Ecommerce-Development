import express from 'express'
import tokenVerify from '../middlewares/tokenVerify.js';
import { allTags, createTag, deleteTag, getSingleTag, updateTag, updateTagStatus } from '../controller/tagController.js';

const router = express.Router();

router.use(tokenVerify)

// students route manage
router.route('/').get(allTags).post(createTag)
router.route('/:id').get(getSingleTag).delete(deleteTag).put(updateTag).patch(updateTag)

router.post("/status/:id", updateTagStatus)

export default router