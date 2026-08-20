import express from "express";
import * as teachers from "../controller/teachers/teachers.controller";

const router = express.Router();

router.get("/", teachers.retrieveTeachers);
router.get("/:id", teachers.retrieveTeacherById);
router.post("/", teachers.createTeacher);

export default router;
