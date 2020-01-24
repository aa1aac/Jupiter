const validator = require("validator");
const bcrypt = require("bcryptjs");

const User = require("../models/Users");
const config = require("../config");

const login = () => {};

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

module.exports = { login, logout, signup };
