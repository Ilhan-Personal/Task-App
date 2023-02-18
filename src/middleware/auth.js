const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = async (req, res, next) => {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2YwODlhM2NiNzk0ZTEwNTdlMjMyZGEiLCJpYXQiOjE2NzY3MDgyNjN9.1_PCpw6YYw9vo8PeJ9voLHK2WvmvHg2no8NxcHj2A_s";

    const decoded = jwt.verify(token, "alwayslookonthebrightside");

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = auth;
