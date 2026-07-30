import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config();
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in the .env file");
}

export default defineConfig({
  schema: "./src/database/schema", // Your schema file path
  out: "./src/database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
