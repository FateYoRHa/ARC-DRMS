import express from "express";
import * as programRoutes from "../controller/academic/programs.controller";

const router = express.Router();

router.post("/programs", programRoutes.createProgram);
router.put("/programs/:id", programRoutes.updateProgram);
export default router;