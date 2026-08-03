import { User } from "../database/schema";
export interface AuthenticatedUser {
  id: number;
  role: User["role"];
  sessionId: string;
}

export interface AccessTokenPayload {
  id: number;
  role: User["role"];
  session_id: string;
  token_version: number;
}

export interface RefreshTokenPayload {
  id: number;
  sessionId: string;
}
