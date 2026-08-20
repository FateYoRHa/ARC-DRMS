import { Request, Response } from "express";
import * as teachersService from "../../service/teachers/teachers.service";
import type { NewTeacher } from "../../validators/api/teachers.validator";

type CreateTeacherRequest = Request<{}, {}, NewTeacher>;
type UpdateTeacherRequest = Request<{ id: string }, {}, NewTeacher>;
export async function retrieveTeachers(req: Request, res: Response) {
  const teachers = await teachersService.retrieveTeachersService();
  res.status(200).json(teachers);
}

export async function retrieveTeacherById(req: Request, res: Response) {
  const { id } = req.params;
  const teacher = await teachersService.retrieveTeacherByIdService(Number(id));
  res.status(200).json(teacher);
}

export async function createTeacher(req: CreateTeacherRequest, res: Response) {
  const newTeacher = await teachersService.createTeacherService(req.body);
  res.status(201).json(newTeacher);
}
