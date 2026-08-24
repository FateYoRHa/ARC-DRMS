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
