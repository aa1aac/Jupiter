const express = require("express");

const UserController = require("../controller/UserController");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

// PUBLIC
// /user/login
router.post("/login", UserController.login);

// PRIVATE
// /user/logout
router.get("/logout", isAuth, UserController.logout);

// PUBLIC
// /user/signup
router.post("/signup", UserController.signup);

// PRIVATE
// /user/
router.get("/", isAuth, UserController.getUser);

module.exports = router;
