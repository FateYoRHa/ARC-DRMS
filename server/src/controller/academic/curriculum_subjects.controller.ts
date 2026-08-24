import * as curriculumSubjectsService from "../../service/academic/curriculum_subjects.service";
import type { Request, Response } from "express";

import {
  UpdateCurriculumSubjectInput,
  CreateCurriculumSubjectInput,
} from "../../validators/api/curriculum_subjects.validator";

type CreateCurriculumSubjectRequest = Request<
  {},
  {},
  CreateCurriculumSubjectInput
>;
type UpdateCurriculumSubjectRequest = Request<
  { id: string },
  {},
  UpdateCurriculumSubjectInput
>;

export async function retrieveCurriculumSubjectsController(
  req: Request,
  res: Response,
) {
  const { id } = req.params;
  const curriculum_subjects =
    await curriculumSubjectsService.retrieveCurriculumSubjectsService(
      Number(id),
    );
  res.status(200).json(curriculum_subjects);
}

export async function addCurriculumSubjectController(
  req: CreateCurriculumSubjectRequest,
  res: Response,
) {
  const newCurriculumSubject =
    await curriculumSubjectsService.addCurriculumSubjectService(req.body);
  res.status(201).json(newCurriculumSubject);
}
