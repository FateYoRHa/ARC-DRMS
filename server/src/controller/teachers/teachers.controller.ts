import { Request, Response } from "express";
import * as teachersService from "../../service/teachers/teachers.service";

export async function getTeachers(req: Request, res: Response) {
  const teachers = await teachersService.getTeachersService();
  res.status(200).json(teachers);
}

export async function getTeacherById(req: Request, res: Response) {
  const { id } = req.params;
  const teacher = await teachersService.getTeacherByIdService(Number(id));
  res.status(200).json(teacher);
}
