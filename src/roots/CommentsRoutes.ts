import { Router } from "express";
import { createNewComment, deleteComment, getAllComments, getDetailComment, updateComment } from "../controllers/commentsController";
import { loggerMiddleware } from "../middlewares/loggerMiddleware";

const router: Router = Router();

router.get('/', loggerMiddleware, getAllComments);
router.get('/:id',loggerMiddleware, getDetailComment);
router.post('/',loggerMiddleware, createNewComment);
router.put('/:id',loggerMiddleware, updateComment);
router.delete('/:id',loggerMiddleware, deleteComment);

export default router;