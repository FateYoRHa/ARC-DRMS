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
    await enrollmentClassesService.retrieveEnrollmentClass(
      Number(req.params.id),
    );
  res.status(200).json(enrollmentClass);
}

export async function retrieveEnrollmentClasses(req: Request, res: Response) {
  const enrollmentClassesList =
    await enrollmentClassesService.retrieveEnrollmentClasses();
  res.status(200).json(enrollmentClassesList);
}
