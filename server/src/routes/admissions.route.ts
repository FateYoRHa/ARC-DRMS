import express from "express";
import * as admissionRoutes from "../controller/students/admissions.controller";
import { validate } from "../middleware/validate";
import {
  newAdmissionSchema,
  updateAdmissionSchema,
} from "../validators/api/admission.validator";

const router = express.Router();

router.post(
  "/register",
  validate(newAdmissionSchema),
  admissionRoutes.createStudentAdmission,
);
router.put(
  "/:id",
  validate(updateAdmissionSchema),
  admissionRoutes.updateStudentAdmission,
);
router.get("/", admissionRoutes.retrieveAllStudentAdmission);
export default router;
