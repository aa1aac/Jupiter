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

// PRIVATE
//  /api/user/edit
router.put("/edit", isAuth, UserController.editProfile);

// PRIVATE
//  /api/user/followers
router.get("/followers", isAuth, UserController.getFollowers);

// PRIVATE
//  /api/user/search
router.post("/search", isAuth, UserController.searchUser);

// PRIVATE
//  /api/user/following
router.get("/following-user", isAuth, UserController.getFollowing);

// PRIVATE
//  /api/user/:id
router.get("/:id", isAuth, UserController.getSpecificProfile);

// PRIVATE
//  /api/user/follow/:id
router.get("/follow/:id", isAuth, UserController.followUser);

module.exports = router;
