import { Request, Response } from "express";
import * as schoolsService from "../../service/academic/schools.service";
import {
  CreateSchoolInput,
  UpdateSchoolInput,
} from "../../validators/api/schools.validator";

type CreateSchoolRequest = Request<{}, {}, CreateSchoolInput>;
type UpdateSchoolRequest = Request<{ id: string }, {}, UpdateSchoolInput>;

export async function retrieveSchool(req: Request, res: Response) {
  const school = await schoolsService.retrieveSchoolService(
    Number(req.params.id),
  );
  res.status(200).json(school);
}

export async function retrieveSchools(req: Request, res: Response) {
  const schoolsList = await schoolsService.retrieveSchoolsService();
  res.status(200).json(schoolsList);
}

export async function createSchool(req: CreateSchoolRequest, res: Response) {
  const newSchool = await schoolsService.createSchoolService(req.body);
  res.status(201).json(newSchool);
}

export async function updateSchool(req: UpdateSchoolRequest, res: Response) {
  const updatedSchool = await schoolsService.updateSchoolService(
    Number(req.params.id),
    req.body,
  );
  res.status(200).json(updatedSchool);
}

export async function archiveSchool(req: Request, res: Response) {
  const archivedSchool = await schoolsService.archiveSchoolService(
    Number(req.params.id),
  );
  res.status(200).json(archivedSchool);
}

export async function restoreSchool(req: Request, res: Response) {
  const restoredSchool = await schoolsService.restoreSchoolService(
    Number(req.params.id),
  );
  res.status(200).json(restoredSchool);
}
