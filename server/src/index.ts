import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import env from "./config/env";
import userRoutes from "./auth/users.route";
import admissionRoutes from "./routes/admissions.route";

import { errorMiddleware } from "./middleware/global.error.middleware";
import { notFoundMiddleware } from "./middleware/notFound.middleware";

const app = express();
const port = Number(env.PORT ?? 5000);

// middlewares
app.use(express.json());
app.use(cors())
app.use(helmet());
app.use(cookieParser());

// --------------------
//* API routes
// --------------------

// AUTH ROUTES
app.use("/users", userRoutes);

// ADMISSIONS ROUTES
app.use("/admissions", admissionRoutes);

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
