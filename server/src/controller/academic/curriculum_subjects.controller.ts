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

export async function retrieveCurriculumSubjects(req: Request, res: Response) {
  const { id } = req.params;
  const curriculum_subjects =
    await curriculumSubjectsService.retrieveCurriculumSubjectsService(
      Number(id),
    );
  res.status(200).json(curriculum_subjects);
}

export async function addCurriculumSubject(
  req: CreateCurriculumSubjectRequest,
  res: Response,
) {
  const newCurriculumSubject =
    await curriculumSubjectsService.addCurriculumSubjectService(req.body);
  res.status(201).json(newCurriculumSubject);
}

export async function updateCurriculumSubject(
  req: UpdateCurriculumSubjectRequest,
  res: Response,
) {
  const { id } = req.params;
  const updatedCurriculumSubject =
    await curriculumSubjectsService.updateCurriculumSubjectService(
      Number(id),
      req.body,
    );
  res.status(200).json(updatedCurriculumSubject);
}

export async function archiveCurriculumSubject(req: Request, res: Response) {
  const { id } = req.params;
  const archivedCurriculumSubject =
    await curriculumSubjectsService.archiveCurriculumSubjectService(Number(id));
  res.status(200).json(archivedCurriculumSubject);
}

export async function restoreCurriculumSubject(req: Request, res: Response) {
  const { id } = req.params;
  const restoredCurriculumSubject =
    await curriculumSubjectsService.restoreCurriculumSubjectService(Number(id));
  res.status(200).json(restoredCurriculumSubject);
}
