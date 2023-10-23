import jwt from "jsonwebtoken";
import User from "../models/User.mjs";

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "ninja", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

export const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "ninja", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
