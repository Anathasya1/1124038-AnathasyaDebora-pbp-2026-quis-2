import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

const router: Router = Router();

// Public
//router.use("/auth", AuthenticationRoutes);

// Private
//router.use("/tableInformation", authMiddleware, TableInformationRoutes)
//router.use("/staff", authMiddleware, StaffRoutes);
// router.use("/staff", StaffRoutes);

export default router; 