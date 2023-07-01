const { decode } = require("jsonwebtoken");
const admin = require("../config/firebase.config");
const router = require("express").Router();
const User = require("../models/user");

const validateToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(404).send();
  }

  const authorization = req.headers.authorization.split(" ");

  if (authorization.length < 2) {
    return res.status(401).send();
  }

  const token = authorization[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);

    if (!decoded) {
      return res.status(401).send({ success: false });
    }

    req.decoded = decoded;
  } catch (err) {
    return res.status(401).send({ success: false, error: err });
  }

  next();
};

router.get("/", validateToken, async (req, res) => {
  const options = {
    sort: {
      createdAt: 1,
    },
  };
  const users = await User.find({}, null, options);

  if (users) {
    return res.status(200).json({ success: true, data: users });
  }

  return res.status(400).json({ success: false, msg: "No data found" });
});

router.get("/auth", validateToken, async (req, res) => {
  try {
    decoded = req.decoded;

    const userExists = await User.findOne({ user_id: decoded.user_id });
    if (!userExists) {
      if (createUser(decoded)) {
        return res.status(201).json({ success: true });
      } else {
        return res.status(400).json("unable to create user, missing data.");
      }
    } else {
      const options = {
        upsert: true,
        new: true,
      };
      const updated = await User.findOneAndUpdate(
        { user_id: decoded.user_id },
        { auth_time: decoded.auth_time },
        options
      );
      return res.status(200).json({ success: true, user: updated });
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

const createUser = async (userData) => {
  const user = new User({
    name: userData.name,
    email: userData.email,
    imageUrl: userData.picture,
    user_id: userData.user_id,
    email_verified: true,
    auth_time: userData.auth_time,
  });
  try {
    user.save();
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = router;
