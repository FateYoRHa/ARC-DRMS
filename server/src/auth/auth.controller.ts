import { Request, Response } from "express";

import * as authService from "./auth.service";
import { RegisterUserInput } from "./validators/auth.api";
type RegisterUserRequest = Request<{}, {}, RegisterUserInput>;

export async function registerUser(req: RegisterUserRequest, res: Response) {
  const user = await authService.registerUserService(req.body);
  res.status(200).json(user);
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  await authService.loginService(email, password);
  res.status(200).json({ message: "Login successful" });
}
