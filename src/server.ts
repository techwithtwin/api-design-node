import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, signIn } from "./handlers/user";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   req["shhh_secret"] = "doggy";
//   next();
// });

app.get("/", (req, res, next) => {
  setTimeout(() => {
    next(new Error("OOPSY"));
  }, 2000);
});

app.use("/api", [protect], router);
app.post("/register", createNewUser);
app.post("/login", signIn);

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  if (err.type === "input") {
    res.status(400).json({ message: "invalid input" });
    return;
  }
  res.status(500).json({
    message: "Something went wrong",
  });
});

export default app;
