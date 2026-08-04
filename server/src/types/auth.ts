import { UUID } from "crypto";
import { User } from "../database/schema";
export interface AuthenticatedUser {
  id: number;
  role: User["role"];
  sessionId: string;
}

export interface AccessTokenPayload {
  id: number;
  role: User["role"];
  session_id: UUID;
  token_version: number;
}

export interface RefreshTokenPayload {
  id: number;
  session_id: UUID;
  token_version: number;
  iat: number;
  exp: number;
}
