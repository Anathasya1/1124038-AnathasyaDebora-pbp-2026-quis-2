import { Router } from "express";
import { createNewComment, deleteComment, getAllComments, getDetailComment, updateComment } from "../controllers/commentsController";

const router: Router = Router();

router.get('/', getAllComments);
router.get('/:id', getDetailComment);
router.post('/', createNewComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router;