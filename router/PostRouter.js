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

// todo
// /api/posts/:id
// PRIVATE    PUT
router.put("/:id", isAuth, PostController.editPosts);

// todo
// /api/posts/:id
// PRIVATE    DELETE
router.delete("/:id", isAuth, PostController.deletePost);

// todo
// /api/posts/specific/:id
// PRIVATE     GET
router.get("/specific/:id", isAuth, PostController.getSpecificPost);

// /api/posts/:id/like
// PRIVATE GET
router.get("/:id/like", isAuth, PostController.likePost);

// todo
// /api/posts/:id/comment
// PRIVATE POST
router.post("/:id/comment", isAuth, PostController.postComment);

// todo
// /api/posts/:id/comment
// PRIVATE GET
router.get("/:id/comment", isAuth, PostController.getComment);

module.exports = router;
