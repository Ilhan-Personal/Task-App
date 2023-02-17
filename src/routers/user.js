const express = require("express");

const router = new express.Router();
const user = require("../models/user.js");
const auth = require("../middleware/auth.js");
const multer = require("multer");
const sharp = require("sharp");
const { sendWelcomeEmail } = require("../emails/account");
const { cancellationEmail } = require("../emails/account");

const uploadAvatar = multer({
  limits: {
    fileSize: 10000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|JPG)$/)) {
      return cb(new Error("Please upload an image"));
    }
    cb(null, true);
  },
});

router.post("/users/signup", async ({ body }, res) => {
  const newuser = new user(body);
  try {
    await newuser.save();
    sendWelcomeEmail(newuser.email, newuser.name);
    res.status(201).send({ newuser });
  } catch (e) {
    res.status(400).send(e);
  }
});
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    req.user.save();
    res.status(200).send();
  } catch (e) {
    res.status(404).send();
  }
});
router.post("/users/login", async (req, res) => {
  try {
    const foundUser = await user.findByCredentials(
      req.body.email,
      req.body.password
    );

    token = await foundUser.generateAuthToken();
    console.log(foundUser);

    res.status(201).send({ token });
    // res.status(201).send({'user':await foundUser.getPublicProfile(),token})
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});
router.get("/users/me", auth, (req, res) => {
  res.send(req.user);
});
router.post(
  "/users/me/avatar",
  auth,
  uploadAvatar.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (err, req, res, next) => {
    res.status(400).send({ error: err.message });
  }
);
router.delete(
  "/users/me/avatar",
  auth,
  uploadAvatar.single("avatar"),
  async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  }
);
router.get("/users/:id", async (req, res) => {
  console.log("in");

  const id = req.params.id;
  try {
    foundUser = await user.findById(id);
    if (!foundUser) {
      return res.status(400).send();
    }
    res.status(201).send(foundUser);
  } catch (e) {
    console.log("couldnt");
    res.status(500).send();
  }
});
router.get("/users/:id/avatar", async (req, res) => {
  try {
    const founduser = await user.findById(req.params.id);
    if (!founduser || !founduser.avatar) {
      throw new Error("not available");
    }
    res.set("Content-Type", "image/jpg");
    res.send(founduser.avatar);
  } catch (e) {
    res.status(404).send(e);
  }
});
router.get("/users", async (req, res) => {
  // fetching all users in db
  users = await user.find({});
  res.send(users);
});
router.get("/users/me", auth, (req, res) => {
  // fetching all users in db
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid operation" });
  }
  try {
    // new : true ensures we return the updated document
    const foundUser = req.user;

    updates.forEach((update) => {
      // console.log(req.body[update])
      // console.log(foundUser[update])
      foundUser[update] = req.body[update];
    });

    if (!foundUser) {
      return res.status(404).send();
    }
    await foundUser.save();
    res.send(foundUser);
  } catch (e) {
    res.status(400).send();
  }
});

router.delete("/users/delete", auth, async (req, res) => {
  try {
    await req.user.remove();
    cancellationEmail(req.user.email, req.user.name);
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
