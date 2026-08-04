import express from "express";
import * as userRoutes from "./auth.controller";
import { validate } from "../middleware/validate";
import { loginSchema, registerSchema } from "./validators/auth.api";
const router = express.Router();

router.post("/register", validate(registerSchema), userRoutes.registerUser);
router.post("/login", validate(loginSchema), userRoutes.login);

router.post("/refresh", userRoutes.refreshAccessToken);
export default router;
