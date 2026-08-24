import express from "express";
import * as programRoutes from "../controller/academic/programs.controller";
import * as schoolRoutes from "../controller/academic/schools.controller";

import * as curriculumSubjectsRoutes from "../controller/academic/curriculum_subjects.controller";
import * as curriculumRoutes from "../controller/academic/curriculums.controller";

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

// Curriculum Subject Routes
router.get(
  "/curriculum-subjects/:id",
  curriculumSubjectsRoutes.retrieveCurriculumSubjects,
);
router.post(
  "/curriculum-subjects",
  curriculumSubjectsRoutes.addCurriculumSubject,
);
router.put(
  "/curriculum-subjects/:id",
  curriculumSubjectsRoutes.updateCurriculumSubject,
);
router.patch(
  "/curriculum-subjects/:id/archive",
  curriculumSubjectsRoutes.archiveCurriculumSubject,
);
router.patch(
  "/curriculum-subjects/:id/restore",
  curriculumSubjectsRoutes.restoreCurriculumSubject,
);

// Curriculum Routes
router.get("/curriculums", curriculumRoutes.retrieveAllCurriculums);
router.get("/curriculums/:id", curriculumRoutes.retrieveCurriculum);

export default router;
