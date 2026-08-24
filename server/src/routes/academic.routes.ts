import express from "express";
import * as programRoutes from "../controller/academic/programs.controller";
import * as schoolRoutes from "../controller/academic/schools.controller";

const router = express.Router();
// Program Routes
router.get("/programs", programRoutes.retrieveAllPrograms);
router.get("/programs/:id", programRoutes.retrieveProgramById);
router.post("/programs", programRoutes.createProgram);
router.put("/programs/:id", programRoutes.updateProgram);
router.patch("/programs/:id", programRoutes.archiveProgram);
router.patch("/programs/:id", programRoutes.restoreProgram);

// School Routes
router.get("/schools", schoolRoutes.retrieveSchools);
router.get("/schools/:id", schoolRoutes.retrieveSchool);
router.post("/schools", schoolRoutes.createSchool);
router.put("/schools/:id", schoolRoutes.updateSchool);
router.patch("/schools/:id", schoolRoutes.archiveSchool);
router.patch("/schools/:id", schoolRoutes.restoreSchool);

export default router;
