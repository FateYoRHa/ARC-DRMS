import express from "express";
import * as userRoutes from "./auth.controller";
import { validate } from "../middleware/validate";
import { registerSchema } from "./validators/auth.api";
const router = express.Router();

router.post("/register", validate(registerSchema), userRoutes.registerUser);

export default router;
