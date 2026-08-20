import { Request, Response } from "express";

import * as programServices from "../../service/academic/programs.service";
import {
  CreateProgramInput,
  UpdateProgramInput,
} from "../../validators/api/program.validator";

type CreateProgramRequest = Request<{}, {}, CreateProgramInput>;
type UpdateProgramRequest = Request<{ id: string }, {}, UpdateProgramInput>;

export async function createProgram(req: CreateProgramRequest, res: Response) {
  const newProgram = await programServices.createProgramService(req.body);
  res.status(200).json(newProgram);
}

export async function updateProgram(req: UpdateProgramRequest, res: Response) {
  const updatedProgram = await programServices.updateProgramService(
    Number(req.params.id),
    req.body,
  );
  res.status(200).json(updatedProgram);
}

export async function retrieveAllPrograms(req: Request, res: Response) {
  const programs = await programServices.retrieveAllProgramsService();
  res.status(200).json(programs);
}

export async function retrieveProgramById(req: Request, res: Response) {
  const program = await programServices.retrieveProgramByIdService(
    Number(req.params.id),
  );
  res.status(200).json(program);
}
