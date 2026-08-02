import express from "express";
import * as userRoutes from "./auth.controller";

const router = express.Router();

router.post("/register", userRoutes.registerUser);

export default router;
