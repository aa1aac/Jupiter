const express = require("express");

const UserController = require("../controller/UserController");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

// PUBLIC
// /api/user/login
router.post("/login", UserController.login);

// PRIVATE
// /api/user/logout
router.get("/logout", isAuth, UserController.logout);

// PUBLIC
// /api/user/signup
router.post("/signup", UserController.signup);

// PRIVATE
// /api/user/
router.get("/", isAuth, UserController.getUser);

// PRIVATE
// /api/user/profile
router.get("/profile", isAuth, UserController.getProfile);

module.exports = router;
