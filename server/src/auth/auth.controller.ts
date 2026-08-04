import { Request, Response } from "express";

import * as authService from "./auth.service";
import { RegisterUserInput } from "./validators/auth.api";
import { AppError } from "../errors/AppError";
type RegisterUserRequest = Request<{}, {}, RegisterUserInput>;

export async function registerUser(req: RegisterUserRequest, res: Response) {
  const ip_address = req.ip;
  if (!ip_address) {
    throw new AppError(500, "Unable to determine client IP");
  }
  const { user, accessToken } = await authService.registerUserService(
    req.body,
    ip_address,
  );
  res.status(200).json({ user, accessToken });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  await authService.loginService(email, password);
  res.status(200).json({ message: "Login successful" });
}
