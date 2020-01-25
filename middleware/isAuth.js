const jwt = require("jsonwebtoken");
const config = require("../config");

const isAuth = (req, res, next) => {
  const { token } = req.cookies;
  //   check for time todo

  if (!token) return res.status(401).json({ err: "please log in" });
  try {
    const decoded = jwt.verify(token, config.SECRET);

    req.payload = decoded;
  } catch (error) {
    return res.status(400).json({ error: "some error occured" });
  }

  next();
};

module.exports = isAuth;
