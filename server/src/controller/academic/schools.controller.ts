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
