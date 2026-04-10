import { Router } from "express";
import PostsRoutes from './PostsRoutes'
import CommentsRoutes from "./CommentsRoutes"


const router: Router = Router();

router.use("/post", PostsRoutes);
router.use("/post-comment", CommentsRoutes);

export default router; 