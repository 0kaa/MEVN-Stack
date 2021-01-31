import express from "express";
import { userRegister, userLogin, getUsers, getProfile } from "../controllers/user.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const router = express.Router();
import auth from "../middleware/auth.js";
const { check } = require("express-validator/check");

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.get("/users", getUsers);

router.get("/", (req, res) => {
  res.send("hi");
});

router.get("/profile", auth, getProfile);

router.post(
  "/signup",
  [
    check("username", "Please Enter a Valid Username")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  userRegister
);

router.post(
  "/login",
  [
    check("username", "Please enter a valid username"),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  userLogin
);

export default router;
