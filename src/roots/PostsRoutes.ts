import { Router } from "express";
import { createNewPost, deletePost, getAllPosts, getDetailPostWithComments, updatePost } from "../controllers/postsController";
import { loggerMiddleware } from "../middlewares/loggerMiddleware";

const router: Router = Router();

router.get('/', loggerMiddleware,  getAllPosts);
router.get('/:id',loggerMiddleware, getDetailPostWithComments);
router.post('/', loggerMiddleware, createNewPost);
router.put('/:id', loggerMiddleware, updatePost);
router.delete('/:id',loggerMiddleware, deletePost);

export default router;