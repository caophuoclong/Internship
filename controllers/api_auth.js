const User = require("../models/user");
const getHashPassword = require("../hashpassword/hash");
const RandomString = require("randomstring");
const jwt = require("jsonwebtoken");
module.exports = {
  login: async (req, res) => {
    const { id, pass } = req.body;
    const getUser = await User.findOne({ id });
    if (getUser) {
      const hashedPassword = getHashPassword.encrypt(pass, getUser.salt);
      if (hashedPassword === getUser.password) {
        req.session.isAuthenticated = true;
        const token = jwt.sign({ id: getUser._id }, "2603");

        return res
          .status(200)
          .send({ token, message: "login thanh cong", id, pass });
      }
    }
    return res.status(403).send("Wrong id or password");
  },
  register: async (req, res) => {
    const salt = RandomString.generate();
    const { id, pass, serectKey } = req.body;
    // serectKey === My DOB
    const admin = await User.findOne({ id: "phuoclong" });
    const newSerectKey = getHashPassword.encrypt(serectKey, admin.salt);

    if (newSerectKey === admin.serectKey) {
      const password = getHashPassword.encrypt(pass, salt);
      const newUser = await new User({
        id,
        password,
        salt,
      });
      await newUser.save();
      console.log("Success");
      return res.sendStatus(200);
    }
    return res.status(403).send("You are not admin");
  },
  verifyToken: async (req, res) => {
    const verify = jwt.verify(req.query.token, "2603");
    if (verify) {
      const user = await User.findOne({ _id: verify.id });
      if (user !== null) {
        const password = getHashPassword.decrypt(user.password, user.salt);
        console.log(password);
        return res.sendStatus(200);
      } else {
        return res.sendStatus(403);
      }

      return res.sendStatus(200);
    }
    return res.sendStatus(403);
  },
};
