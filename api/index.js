import express from "express";
import usersRouter from "../routes/users.js";

const app = express();
app.use(express.json());

// routes
app.use("/users", usersRouter);

// default route
app.get("/", (req, res) => {
  res.send("Backend Transzity API is running on Vercel 🚀");
});

export default app;
