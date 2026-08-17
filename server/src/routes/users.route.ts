import express from "express";
import * as usersController from "../controller/users/users.controller";

import { validate } from "../middleware/validate";

const router = express.Router();

router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getUserById);

export default router;
