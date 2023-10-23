import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRouter.mjs";
import cookieParser from "cookie-parser";
import { requireAuth, checkUser } from "./middleWare/authMiddleWare.mjs";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");

const connectDB =
  "mongodb+srv://mirfoziln:qwerty123456@cluster0.lhgkffx.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(connectDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) =>
    app.listen(4000, () => console.log("MongoDB successfull connected"))
  )
  .catch((err) => console.log(err));

app.get("*", checkUser);
app.get("/", requireAuth, (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
app.use(authRoutes);
