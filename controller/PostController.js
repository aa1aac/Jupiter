const Post = require("../models/Posts");
const User = require("../models/Users");
const Comment = require("../models/Comments");

const getPosts = (req, res) => {
  User.findById(req.payload.user).then(user => {
    let search = user.following;

    search.push({ _user: user._id });

    Post.find({ $or: search })
      .sort({ date: -1 })
      .limit(5)
      .then(posts => {
        console.log(posts[0]._user);
        res.json({ posts: posts });
      });
  });
};

const postPosts = (req, res) => {
  if (!req.body.text) return res.json({ error: "invalid input" });
  User.findById(req.payload.user).then(user => {
    if (!user) {
      return res.json({ error: "invalid request" });
    }

    const post = new Post({
      _user: req.payload.user,
      text: req.body.text,
      first_name: user.first_name,
      last_name: user.last_name
    });

    post.save().then(post => {
      res.json({ post, msg: "successfully posted" });
    });
  });
};

const likePost = (req, res) => {
  console.log(req.params.id);
  Post.findById(req.params.id).then(post => {
    if (!post) return res.json({ msg: "request invalid" });

    if (post.likes.includes(req.payload.user)) {
      // unlike the post
      const existingLikeIndex = post.likes.indexOf(req.payload.user);
      console.log(existingLikeIndex);
      post.likes.splice(existingLikeIndex, 1);
    } else {
      post.likes = [...post.likes, req.payload.user];
    }

    post.save().then(post => {
      res.json({ msg: "liked/unliked", post });
    });
  });
};

const postComment = (req, res) => {
  User.findById(req.payload.user).then(user => {
    if (!user) return res.json({ error: "no users found" });

    Post.findById(req.params.id).then(post => {
      if (!post) return res.json({ error: "nod such post exists" });

      let comment = new Comment({
        _user: user._id,
        _post: post._id,
        text: req.body.text,
        first_name: user.first_name,
        last_name: user.last_name
      });

      comment.save().then(comment => {
        res.json({ msg: "comment posted", comment });
      });
    });
  });
};

const getComment = (req, res) => {
  User.findById(req.payload.user).then(user => {
    if (!user) return res.json({ error: "no user found" });

    Comment.find({ _post: req.params.id }).then(comments => {
      res.json({ msg: "comments fetched", comments });
    });
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
  getProfilePosts,
  likePost,
  postComment,
  getComment
};
