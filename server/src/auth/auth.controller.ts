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
  const ip_address = req.ip;
  if (!ip_address) {
    throw new AppError(500, "Unable to determine client IP");
  }
  const { email, password } = req.body;
  const { accessToken, refreshToken } = await authService.loginService(
    email,
    password,
    ip_address,
  );
  res.status(200).json({
    message: "Login successful",
    ACCESS_TOKEN: accessToken,
  });
}

export async function logout(req: Request, res: Response) {
  await authService.logoutService(req.cookies.refreshToken);
  res.status(200).json({ message: "Logged out successfully" });
}

export async function refreshAccessToken(req: Request, res: Response) {
  const ip_address = req.ip;
  if (!ip_address) {
    throw new AppError(500, "Unable to determine client IP");
  }

  const { accessToken, refreshToken } = await authService.refreshTokenService(
    req.cookies.refreshToken,
    ip_address,
    req.user.role,
  );

  res.status(200).json({ ACCESS_TOKEN: accessToken, user: req.user });
}
