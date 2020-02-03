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

  User.findById(req.payload.user, "first_name _id email ").then(user => {
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

  User.findById(req.payload.user).then(user => {
    if (!user) return res.json({ error: "invalid request" });

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
      "first_name _id last_name image"
    ).then(users => {
      console.log(users);
      res.json({ msg: "user Successfully fetched", users });
    });
  });
};

const getSpecificProfile = (req, res) => {
  User.findById(req.payload.user).then(requestingUser => {
    if (!requestingUser) return res.json({ error: "invalid request" });

    User.findById(req.params.id, "-password").then(user => {
      let index = user.followers.findIndex(follower => {
        return follower._user === req.payload.user;
      });

      if (index !== -1) {
        res.json({ msg: "fetched user", user, isFollowing: true });
      } else {
        res.json({ msg: "fetched user", user, isFollowing: false });
      }
    });
  });
};

const followUser = (req, res) => {
  User.findById(req.payload.user, "-password").then(user => {
    if (!user) return res.json({ error: "invalid request" });

    let index = user.following.findIndex(following => {
      return following._user === req.params.id;
    });

    if (index === -1) {
      // follow the user
      user.following.push({ _user: req.params.id });

      user.save().then(() => {
        User.findById(req.params.id, "-password").then(user => {
          user.followers.push({ _user: req.payload.user });

          user.save().then(user => {
            return res.json({ msg: "followed", user, isFollowing: true });
          });
        });
      });
    } else {
      // unfollow the user
      user.following.splice(index, 1);

      user.save().then(() => {
        User.findById(req.params.id, "-password").then(user => {
          let indexOfRequester = user.followers.findIndex(follower => {
            follower._user === req.payload.user;
          });

          user.followers.splice(indexOfRequester, 1);

          user.save().then(user => {
            res.json({ msg: "unfollowed", user, isFollowing: false });
          });
        });
      });
    }
  });
};

const getFollowing = (req, res) => {
  User.findById(req.payload.user, "following").then(user => {
    if (!user) return res.json({ error: "invalid user request" });
    let query = [];
    user.following.map(user => {
      query.push(renameProp("_user", "_id", user));
    });

    User.find({ $or: query }, "first_name last_name _id").then(
      followingUsers => {
        
        return res.json({ users: followingUsers, msg: "users fetched" });
      }
    );
  });
};

const renameProp = (oldProp, newProp, { [oldProp]: old, ...others }) => {
  debugger;
  return {
    [newProp]: old,
    ...others
  };
};
module.exports = {
  login,
  logout,
  signup,
  getUser,
  getProfile,
  editProfile,
  getFollowers,
  searchUser,
  getSpecificProfile,
  followUser,
  getFollowing
};
