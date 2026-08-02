import { cleanEnv, str, port, url } from "envalid";
import dotenv from "dotenv";
dotenv.config();

const env = cleanEnv(process.env, {
  DATABASE_URL: str(),
  PORT: port({ default: 5000 }),
  ACCESS_TOKEN_SECRET: str(),
  REFRESH_TOKEN_SECRET: str(),
  ACCESS_TOKEN_EXPIRES: str(),
  REFRESH_TOKEN_EXPIRES: str(),
});

export default env;
