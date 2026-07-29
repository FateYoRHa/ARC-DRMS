import { parseError } from "../utils/errors";
import { Request, Response } from "express";

import * as userService from "./users.service";

export async function registerUser(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const user = await userService.registerUserService(name, email, password);
    res.status(200).json(user);
  } catch (error: unknown) {
    const verifiedError = parseError(error);
    console.log("Error at registerUser controller", verifiedError);
    res
      .status(verifiedError.status || 500)
      .json({ message: verifiedError.message || "Internal Server Error." });
  }
}
