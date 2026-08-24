import * as curriculumsService from "../../service/academic/curriculums.service";
import type { Request, Response } from "express";

export async function retrieveAllCurriculums(req: Request, res: Response) {
  const curriculums = await curriculumsService.retrieveAllCurriculumsService();
  return res.json(curriculums);
}
export async function retrieveCurriculum(req: Request, res: Response) {
  const { id } = req.params;
  const curriculum = await curriculumsService.retrieveCurriculumService(
    Number(id),
  );
  return res.json(curriculum);
}

export async function createCurriculum(req: Request, res: Response) {
  const curriculumData = req.body;
  const newCurriculum =
    await curriculumsService.createCurriculumService(curriculumData);
  return res.status(201).json(newCurriculum);
}

export async function updateCurriculum(req: Request, res: Response) {
  const { id } = req.params;
  const curriculumData = req.body;
  const updatedCurriculum = await curriculumsService.updateCurriculumService(
    Number(id),
    curriculumData,
  );
  return res.json(updatedCurriculum);
}

export async function archiveCurriculum(req: Request, res: Response) {
  const { id } = req.params;
  const archivedCurriculum = await curriculumsService.archiveCurriculumService(
    Number(id),
  );
  return res.json(archivedCurriculum);
}

export async function restoreCurriculum(req: Request, res: Response) {
  const { id } = req.params;
  const restoredCurriculum = await curriculumsService.restoreCurriculumService(
    Number(id),
  );
  return res.json(restoredCurriculum);
}
