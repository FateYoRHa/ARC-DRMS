import { Request, Response } from "express";
import {
  createAdmissionSchema,
  updateAdmissionSchema,
  CreateAdmissionInput,
  UpdateAdmissionInput,
} from "../../validators/api/admission.validator";
import * as admissionServices from "../../service/students/admissions.service";

type CreateAdmissionRequest = Request<{}, {}, CreateAdmissionInput>;
type UpdateAdmissionRequest = Request<{ id: string }, {}, UpdateAdmissionInput>;

export async function createStudentAdmission(
  req: CreateAdmissionRequest,
  res: Response,
) {
  const newAdmission = await admissionServices.createStudentAdmissionService(
    req.body,
  );
  res.status(200).json(newAdmission);
}
export async function updateStudentAdmission(
  req: UpdateAdmissionRequest,
  res: Response,
) {
  const updatedAdmission =
    await admissionServices.updateStudentAdmissionService(
      req.body,
      Number(req.params.id),
    );
  res.status(200).json(updatedAdmission);
}

export async function retrieveAllStudentAdmission(req: Request, res: Response) {
  const admissions =
    await admissionServices.retriveAllStudentAdmissionsService();
  res.status(200).json(admissions);
}

export async function retrieveStudentAdmission(req: Request, res: Response) {
  const application_id = Number(req.params.id);
  const admission =
    await admissionServices.retriveStudentAdmissionService(application_id);
  res.status(200).json(admission);
}

export async function archiveStudentAdmission(req: Request, res: Response) {
  const application_id = Number(req.params.id);
  await admissionServices.archiveStudentAdmissionService(application_id);
  res.status(200).json({ message: "Admission archived." });
}

export async function restoreStudentAdmission(req: Request, res: Response) {
  const application_id = Number(req.params.id);
  await admissionServices.restoreStudentAdmissionService(application_id);
  res.status(200).json({ message: "Admission restored." });
}
