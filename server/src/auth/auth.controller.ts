import { Request, Response } from "express";

import * as authService from "./auth.service";

export async function registerUser(req: Request, res: Response) {
  const { name, email, password } = req.body;
  const user = await authService.registerUserService(name, email, password);
  res.status(200).json(user);
}
