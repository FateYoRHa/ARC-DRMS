import { Request, Response } from "express";

import * as userService from "./users.service";

export async function registerUser(req: Request, res: Response) {
  const { name, email, password } = req.body;
  const user = await userService.registerUserService(name, email, password);
  res.status(200).json(user);
}
