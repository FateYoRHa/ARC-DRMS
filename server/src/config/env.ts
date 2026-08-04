import { cleanEnv, str, port } from "envalid";
import dotenv from "dotenv";
dotenv.config();

const env = cleanEnv(process.env, {
  DATABASE_URL: str(),
  PORT: port({ default: 5000 }),
  ACCESS_TOKEN_SECRET: str(),
  REFRESH_TOKEN_SECRET: str(),
  ACCESS_TOKEN_EXPIRES: str({
    choices: ["15m", "1h", "7d"],
  }),
  REFRESH_TOKEN_EXPIRES: str({
    choices: ["7d", "14d", "30d"],
  }),
  NODE_ENV: str(),
  COOKIE_SECRET: str(),
});

export default env;
