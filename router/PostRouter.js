const express = require("express");
const isAuth = require("../middleware/isAuth");
const PostController = require("../controller/PostController");

const router = express.Router();

// /api/posts
// PRIVATE   GET
router.get("/", isAuth, PostController.getPosts);

// /api/posts/
// PRIVATE  POST
router.post("/", isAuth, PostController.postPosts);

// /api/posts/:id
// PRIVATE    DELETE
router.delete("/:id", isAuth, PostController.deletePost);

// /api/posts/:id/like
// PRIVATE GET
router.get("/:id/like", isAuth, PostController.likePost);

// /api/posts/:id/comment
// PRIVATE POST
router.post("/:id/comment", isAuth, PostController.postComment);

// /api/posts/:id/comment
// PRIVATE GET
router.get("/:id/comment", isAuth, PostController.getComment);

// /api/posts/profile-specific
// PRIVATE GET
router.get("/profile-specific", isAuth, PostController.getProfilePosts);

// /api/posts/user-sepcific-posts
// PRIVATE GET
router.get(
  "/user-specific-posts/:id",
  isAuth,
  PostController.getOtherUserPosts
);

module.exports = router;
