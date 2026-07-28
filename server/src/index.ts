import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 5000);

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "ARC-DRMS server is running" });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
