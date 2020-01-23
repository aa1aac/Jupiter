const express = require("express");

const AuthController = require("../controller/AuthController");

const router = express.Router();

// PUBLIC
// /auth/login
router.post("login", AuthController.login);

// PRIVATE
// /auth/logout
router.get("logout", AuthController.logout);

// PUBLIC
// /auth/signup
router.post("signup", AuthController.signup);

module.exports = router;
