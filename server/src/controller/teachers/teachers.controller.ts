import { Request, Response } from "express";
import * as teachersService from "../../service/teachers/teachers.service";
import type {
  NewTeacher,
  UpdateTeacherInput,
} from "../../validators/api/teachers.validator";

type CreateTeacherRequest = Request<{}, {}, NewTeacher>;
type UpdateTeacherRequest = Request<{ id: string }, {}, UpdateTeacherInput>;
export async function retrieveTeachers(req: Request, res: Response) {
  const teachers = await teachersService.retrieveTeachersService();
  res.status(200).json(teachers);
}

export async function retrieveTeacherById(req: Request, res: Response) {
  const { id } = req.params;
  const teacher = await teachersService.retrieveTeacherByIdService(Number(id));
  res.status(200).json(teacher);
}
// ! TODO : call create teacher service when admin/super_admin updates user role to teacher
// ! flow will be admin/super_admin updates user role to teacher -> call create teacher service -> create teacher record in teachers table
export async function createTeacher(req: CreateTeacherRequest, res: Response) {
  const newTeacher = await teachersService.createTeacherService(req.body);
  res.status(201).json(newTeacher);
}

export async function updateTeacher(req: UpdateTeacherRequest, res: Response) {
  const { id } = req.params;
  const updatedTeacher = await teachersService.updateTeacherService(
    Number(id),
    req.body,
  );
  res.status(200).json(updatedTeacher);
}

export async function archiveTeacher(req: Request, res: Response) {
  const { id } = req.params;
  const archivedTeacher = await teachersService.archiveTeacherService(
    Number(id),
  );
  res.status(200).json(archivedTeacher);
}

export async function restoreTeacher(req: Request, res: Response) {
  const { id } = req.params;
  const restoredTeacher = await teachersService.restoreTeacherService(
    Number(id),
  );
  res.status(200).json(restoredTeacher);
}
