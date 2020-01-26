const express = require("express");
const isAuth = require("../middleware/isAuth");
const PostController = require("../controller/PostController");

const router = express.Router();

// todo
// /api/posts
// PRIVATE   GET
router.get("/", isAuth, PostController.getPosts);

// todo
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

module.exports = router;
