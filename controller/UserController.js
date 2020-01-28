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

const logout = () => {};

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

module.exports = { login, logout, signup, getUser, getProfile };
