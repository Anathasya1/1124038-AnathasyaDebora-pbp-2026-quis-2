import { Router } from "express";
import { createNewPost, deletePost, getAllPosts, getDetailPostWithComments, updatePost } from "../controllers/postsController";
import { loggerMiddleware } from "../middlewares/loggerMiddleware";

const router: Router = Router();

router.get('/', loggerMiddleware,  getAllPosts);
router.get('/:id', getDetailPostWithComments);
router.post('/', createNewPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;