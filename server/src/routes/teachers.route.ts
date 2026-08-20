import express from "express";
import * as teachers from "../controller/teachers/teachers.controller";

const router = express.Router();

router.get("/", teachers.retrieveTeachers);
router.get("/:id", teachers.retrieveTeacherById);
router.post("/", teachers.createTeacher);
router.put("/:id", teachers.updateTeacher);
router.put("/archive/:id", teachers.archiveTeacher);
router.put("/restore/:id", teachers.restoreTeacher);
export default router;
