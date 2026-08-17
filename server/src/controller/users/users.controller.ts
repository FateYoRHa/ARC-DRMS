import type { Request, Response } from "express";
import * as usersService from "../../service/index.services";

export async function getAllUsersController(req: Request, res: Response) {
  const allUsers = await usersService.getAllUsersService();
  res.status(200).json(allUsers);
}

export async function getUserByIdController(req: Request, res: Response) {
  const { id } = req.params;
  const user = await usersService.getUserByIdService(Number(id));
  res.status(200).json(user);
}
