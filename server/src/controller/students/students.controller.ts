import * as studentService from "../../service/students/students.service";
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
