const Post = require("../models/Posts");
const User = require("../models/Users");

const getPosts = (req, res) => {};

const postPosts = (req, res) => {
  if (!req.body.text) return res.json({ error: "invalid input" });
  const post = new Post({
    _user: req.payload.user,
    text: req.body.text
  });

  console.log(post);
  post.save().then(post => {
    res.json({ post, msg: "successfully posted" });
  });
};

const editPosts = (req, res) => {};

const deletePost = (req, res) => {};

const getSpecificPost = (req, res) => {};

module.exports = {
  getPosts,
  postPosts,
  editPosts,
  deletePost,
  getSpecificPost
};
