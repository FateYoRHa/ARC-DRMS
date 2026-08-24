import express from "express";
import * as enrollmentClassRoutes from "../controller/enrollment/enrollment-classes.controller";

const router = express.Router();

// Enrollment Class Routes
router.get("/classes/:id", enrollmentClassRoutes.retrieveEnrollmentClass);
router.get("/classes", enrollmentClassRoutes.retrieveEnrollmentClasses);
router.post("/classes", enrollmentClassRoutes.createEnrollmentClass);
router.put("/classes/:id", enrollmentClassRoutes.updateEnrollmentClass);
router.delete("/classes/:id", enrollmentClassRoutes.deleteEnrollmentClass);

export default router;
