const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/Users");
const config = require("../config");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    User.findOne({ email }).then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (isMatch) {
            // set up a cookie
            res.cookie(
              "token",
              jwt.sign({ user: user._id }, config.SECRET, { expiresIn: "24h" }),
              { maxAge: 86400 * 1000 }
            );

            // send user data
            return res.json({
              msg: "user successfully logged in",
              user: {
                _id: user._id,
                first_name: user.first_name,
                email: user.email
              }
            });
          } else {
            return res.json({ error: "password incorrect" });
          }
        });
      } else {
        res.json({ error: "no such user found" });
      }
    });
  } else {
    return res.json({ error: "invalid value" });
  }
};

const logout = (req, res) => {
  res.cookie("token", "", { maxAge: 1000 });
  res.json({ msg: "user Logged out" });
};

const signup = async (req, res) => {
  const { first_name, last_name, password, confirm, email } = req.body;

  if (first_name && last_name && password && confirm && email) {
    if (validator.isEmail(email, [{ domain_specific_validation: true }])) {
      if (await User.exists({ email })) {
        return res.json({ error: "user already exists. Try loggin in." });
      }

      if (password === confirm) {
        // todo
        const user = new User({
          first_name,
          last_name,
          email,
          password
        });
        console.log(user);

        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);

        user.password = hash;

        await user.save();

        return res.json({ msg: "user created. You can log in!" });
      } else {
        return res.json({ error: "passwords do not match" });
      }
    } else {
      return res.json({ error: "invalid email" });
    }
  } else {
    return res.json({ error: "none of the fields can be empty" });
  }
};

const getUser = (req, res) => {
  console.log(req.payload);

  User.findById(req.payload.user, "first_name _id email").then(user => {
    if (!user._id) {
      return res.json({ error: "invalid token request" });
    }

    return res.json({ user });
  });
};

const getProfile = (req, res) => {
  User.findById(req.payload.user, "-password").then(user => {
    if (!user) return res.json({ error: "no such user found" });

    res.json({ msg: "profile fetched", user });
  });
};

const editProfile = (req, res) => {
  User.findById(req.payload.user).then(user => {
    if (!user) return res.json({ error: "invalid request" });
    const { bio } = req.body;

    user.bio = bio;

    user.save().then(user => {
      res.json({ user, msg: "successfully edited" });
    });
  });
};

const getFollowers = (req, res) => {
  User.findById(req.payload.user, " following followers").then(user => {
    if (!user) res.json({ error: "no such user found" });
    let followers = [];
    let following = [];

    let userFollowers = [];
    let userFollowing = [];

    user.followers.map(user => followers.push(user._user));
    user.following.map(user => following.push(user._user));

    User.find({ _id: { $in: followers } }, "first_name last_name _id")
      .then(users => {
        userFollowers = users;
      })
      .then(() => {
        User.find({ _id: { $in: following } }, "first_name last_name _id")
          .then(users => {
            userFollowing = users;
            // console.log(userFollowing);
          })
          .then(() => {
            console.log("Followers", userFollowers, "following", userFollowing);

            res.json({
              msg: "fetched following data",
              userFollowers,
              userFollowing
            });
          });
      });
  });
};

const searchUser = (req, res) => {
  let queryString = req.body.search;

  User.find(
    {
      $and: [
        { _id: { $ne: req.payload.user } },
        {
          $or: [
            { first_name: { $regex: `^${queryString}.*`, $options: "i" } },
            { last_name: { $regex: `^${queryString}.*`, $options: "i" } }
          ]
        }
      ]
    },
    "first_name _id last_name"
  ).then(users => {
    console.log(users);
    res.json({ msg: "user Successfully fetched", users });
  });
};

module.exports = {
  login,
  logout,
  signup,
  getUser,
  getProfile,
  editProfile,
  getFollowers,
  searchUser
};
