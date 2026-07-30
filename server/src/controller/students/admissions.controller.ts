import { parseError } from "../../utils/errors";
import { Request, Response } from "express";

import * as admissionServices from "../../service/students/admissions.service";

export async function createStudentAdmission(req: Request, res: Response) {
  try {
    const {
      first_name,
      middle_name,
      last_name,
      email,
      phone_number,
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
      first_name,
      middle_name,
      last_name,
      email,
      phone_number,
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
  } catch (error) {
    const verifiedError = parseError(error);
    console.log("Error at new admission controller", verifiedError);
    res
      .status(verifiedError.status || 500)
      .json({ message: verifiedError.message || "Internal Server Error." });
  }
}
