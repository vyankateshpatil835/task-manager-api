const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
connectDB();

const authRouter = require("./routes/authRoutes");
const taskRouter = require("./routes/taskRoutes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);

app.get("/", (req, res) => {
  res.json({ message: "Task manager API is Running" });
});

app.get("/api/status", (req, res) => {
  res.json({ status: "ok", version: "1.0" });
});

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is Running on Port ", port);
});
