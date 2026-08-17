import * as studentService from "../../service/index.services";
import { Request, Response } from "express";
import { UpdateStudentInput } from "../../validators/api/student.validator";

type UpdateStudentRequest = Request<{ id: string }, {}, UpdateStudentInput>;
export async function updateStudent(req: UpdateStudentRequest, res: Response) {
  const student = await studentService.updateStudentService(
    req.body,
    Number(req.params.id),
  );

  return res.status(200).json(student);
}
export async function retrieveStudents(req: Request, res: Response) {
  const students = await studentService.retrieveStudentsService();
  return res.status(200).json(students);
}

export async function retrieveStudent(req: Request, res: Response) {
  const student = await studentService.retrieveStudentService(
    Number(req.params.id),
  );
  return res.status(200).json(student);
}
