import express from "express";
import * as userRoutes from "./users.controller";

const router = express.Router();

router.post("/register", userRoutes.registerUser);

export default router;
