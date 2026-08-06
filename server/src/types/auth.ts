import { UUID } from "crypto";
import { User } from "../database/schema";
import { Roles } from "../auth/rbac/roles";
export interface AuthenticatedUser {
  id: number;
  role: Roles;
  sessionId: string;
}

export interface AccessTokenPayload {
  id: number;
  role: Roles;
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
