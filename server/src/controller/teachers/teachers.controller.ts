import { Request, Response } from "express";
import * as teachersService from "../../service/teachers/teachers.service";

export async function retrieveTeachers(req: Request, res: Response) {
  const teachers = await teachersService.retrieveTeachersService();
  res.status(200).json(teachers);
}

export async function retrieveTeacherById(req: Request, res: Response) {
  const { id } = req.params;
  const teacher = await teachersService.retrieveTeacherByIdService(Number(id));
  res.status(200).json(teacher);
}

