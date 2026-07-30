import { cleanEnv, str, port, url } from "envalid";
import dotenv from "dotenv";
dotenv.config();

const env = cleanEnv(process.env, {
  DATABASE_URL: url(),
  PORT: port({ default: 5000 }),
});

export default env;
