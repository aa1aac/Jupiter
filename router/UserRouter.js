const express = require("express");

const UserController = require("../controller/UserController");

const router = express.Router();

// PUBLIC
// /user/login
router.post("login", UserController.login);

// PRIVATE
// /user/logout
router.get("logout", UserController.logout);

// PUBLIC
// /user/signup
router.post("/signup", UserController.signup);

module.exports = router;
