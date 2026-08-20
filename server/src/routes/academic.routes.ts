import express from "express";
import * as programRoutes from "../controller/academic/programs.controller";

const router = express.Router();
// Program Routes
router.get("/programs", programRoutes.retrieveAllPrograms);
router.get("/programs/:id", programRoutes.retrieveProgramById);
router.post("/programs", programRoutes.createProgram);
router.put("/programs/:id", programRoutes.updateProgram);
export default router;