import express from "express";
import * as admissionRoutes from "../controller/students/admissions.controller";

const router = express.Router();

router.post("/admission", admissionRoutes.createStudentAdmission);

export default router;
