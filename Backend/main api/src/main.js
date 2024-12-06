import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
import dosenRouter from "./Routers/dosenRouter.js";
import studentRouter from "./Routers/mahasiswaRouter.js";
import authRouter from "./Routers/authRouter.js";
import adminRouter from "./Routers/adminRouter.js";

const app = express();

dotenv.config();
const port = process.env.PORT;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.post("/", async (req, res) => {
  try {
    const resultPythonResponse = await fetch("http://localhost:5000/absensi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    if (!resultPythonResponse.ok) {
      throw new Error("Error fetching data from Python API");
    }
    const resultPython = await resultPythonResponse.json();
    res.json({
      msg: "berhasil",
      resultPython,
    });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

app.use("/lectures", dosenRouter);
app.use("/students", studentRouter);
app.use("/login", authRouter);
app.use("/admin", adminRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
