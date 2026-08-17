import express from "express";
import * as studentRoutes from "../controller/index.controllers";

const router = express.Router();

router.put("/:id", studentRoutes.updateStudent);
router.get("/", studentRoutes.retrieveStudents);
router.get("/:id", studentRoutes.retrieveStudent);

export default router;
