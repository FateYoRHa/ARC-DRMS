import express from "express";
import env from "./config/env";
import userRoutes from "./auth/users.route";


const app = express();
const port = Number(env.PORT ?? 5000);

app.use(express.json());

// AUTH ROUTES
app.use("/users", userRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "ARC-DRMS server is running" });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
