const Post = require("../models/Posts");
const User = require("../models/Users");

const getPosts = (req, res) => {
  User.findById(req.payload.user).then(user => {
    let search = user.following;

    search.push({ _user: user._id });

    Post.find({ $or: search })
      .sort({ date: -1 })
      .limit(10)
      .then(posts => {
        res.json({ posts: posts });
      });
  });
};

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

const getProfilePosts = (req, res) => {};

module.exports = {
  getPosts,
  postPosts,
  editPosts,
  deletePost,
  getSpecificPost,
  getProfilePosts
};
