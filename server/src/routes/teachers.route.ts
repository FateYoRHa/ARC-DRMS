import express from "express";
import * as teachers from "../controller/teachers/teachers.controller";

const router = express.Router();

router.get("/teachers", teachers.retrieveTeachers);
router.get("/teachers/:id", teachers.retrieveTeacherById);

export default router;
