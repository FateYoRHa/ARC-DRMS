import { Request, Response } from "express";
import * as teachersService from "../../service/teachers/teachers.service";

export async function getTeachers(req: Request, res: Response) {
  const teachers = await teachersService.getTeachersService();
  res.status(200).json(teachers);
}
