import * as enrollmentClassesService from "../../service/enrollment/enrollment-classes.service";
import { Request, Response } from "express";

import type {
  NewEnrollmentClass,
  UpdateEnrollmentClassInput,
} from "../../validators/api/enrollment-classes.validator";

type EnrollmentClassRequest = Request<{}, {}, NewEnrollmentClass>;
type UpdateEnrollmentClassRequest = Request<
  { id: string },
  {},
  UpdateEnrollmentClassInput
>;

export async function retrieveEnrollmentClass(req: Request, res: Response) {
  const enrollmentClass =
    await enrollmentClassesService.retrieveEnrollmentClassService(
      Number(req.params.id),
    );
  res.status(200).json(enrollmentClass);
}

export async function retrieveEnrollmentClasses(req: Request, res: Response) {
  const enrollmentClassesList =
    await enrollmentClassesService.retrieveEnrollmentClassesService();
  res.status(200).json(enrollmentClassesList);
}

export async function createEnrollmentClass(
  req: EnrollmentClassRequest,
  res: Response,
) {
  const createdEnrollmentClass =
    await enrollmentClassesService.createEnrollmentClass(req.body);
  res.status(201).json(createdEnrollmentClass);
}

export async function updateEnrollmentClass(
  req: UpdateEnrollmentClassRequest,
  res: Response,
) {
  const updatedEnrollmentClass =
    await enrollmentClassesService.updateEnrollmentClassService(
      Number(req.params.id),
      req.body,
    );
  res.status(200).json(updatedEnrollmentClass);
}
