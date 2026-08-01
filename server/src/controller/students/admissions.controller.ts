import { Request, Response } from "express";

import * as admissionServices from "../../service/students/admissions.service";

export async function createStudentAdmission(req: Request, res: Response) {
  const {
    application_id,
    first_name,
    middle_name,
    last_name,
    email,
    phone_number,
    house_number,
    street,
    barangay,
    city,
    province,
    zip_code,
    country,
    previous_school,
    year_graduated,
  } = req.body;
  const newAdmission = await admissionServices.createStudentAdmissionService(
    application_id,
    first_name,
    middle_name,
    last_name,
    email,
    phone_number,
    house_number,
    street,
    barangay,
    city,
    province,
    zip_code,
    country,
    previous_school,
    year_graduated,
  );
  res.status(200).json(newAdmission);
}
export async function updateStudentAdmission(req: Request, res: Response) {
  const application_id = req.params.id;
  const {
    first_name,
    middle_name,
    last_name,
    email,
    phone_number,
    house_number,
    street,
    barangay,
    city,
    province,
    zip_code,
    country,
    previous_school,
    year_graduated,
  } = req.body;
  const updatedAdmission =
    await admissionServices.updateStudentAdmissionService(
      application_id,
      first_name,
      middle_name,
      last_name,
      email,
      phone_number,
      house_number,
      street,
      barangay,
      city,
      province,
      zip_code,
      country,
      previous_school,
      year_graduated,
    );
  res.status(200).json(updatedAdmission);
}

export async function retrieveAllStudentAdmission(req: Request, res: Response) {
  const admissions =
    await admissionServices.retriveAllStudentAdmissionsService();
  res.status(200).json(admissions);
}

export async function retrieveStudentAdmission(req: Request, res: Response) {
  const application_id = req.params.id;
  const admission =
    await admissionServices.retriveStudentAdmissionService(application_id);
  res.status(200).json(admission);
}

export async function archiveStudentAdmission(req: Request, res: Response) {
  const application_id = req.params.id;
  await admissionServices.archiveStudentAdmissionService(application_id);
  res.status(200).json({ message: "Admission archived." });
}

export async function restoreStudentAdmission(req: Request, res: Response) {
  const application_id = req.params.id;
  await admissionServices.restoreStudentAdmissionService(application_id);
  res.status(200).json({ message: "Admission restored." });
}
