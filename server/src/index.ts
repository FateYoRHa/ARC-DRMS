import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import env from "./config/env";
import authRoutes from "./auth/auth.route";
import admissionRoutes from "./routes/admissions.route";
import studentRoutes from "./routes/students.route";
import userRoutes from "./routes/users.route";
import teacherRoutes from "./routes/teachers.route";
import programRoutes from "./routes/academic.routes";

import { errorMiddleware } from "./middleware/global.error.middleware";
import { notFoundMiddleware } from "./middleware/notFound.middleware";

const app = express();
const port = Number(env.PORT ?? 5000);

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);
app.use(helmet());
app.use(cookieParser(env.COOKIE_SECRET));

// --------------------
//* API routes
// --------------------

// AUTH ROUTES
app.use("/auth", authRoutes);

// USER ROUTES
app.use("/users", userRoutes);

// ADMISSIONS ROUTES
app.use("/admissions", admissionRoutes);

// STUDENT ROUTES
app.use("/students", studentRoutes);

// TEACHER ROUTES
app.use("/teachers", teacherRoutes);

// ACADEMIC ROUTES
app.use("/academic", programRoutes);

// --------------------
//! ERROR MIDDLEWARES
// --------------------
app.use(notFoundMiddleware); // Handles requests that don't match any registered route

// GLOBAL ERROR HANDLER, KEEP THIS LAST
app.use(errorMiddleware);

// --------------------
// SERVER START
// --------------------
app.get("/", (_req, res) => {
  res.json({ message: "ARC-DRMS server is running" });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
