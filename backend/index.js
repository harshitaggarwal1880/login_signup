const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 5000;
const { register, login, logout } = require("./controllers/usersController");
const checkware = require("./middlewares/checkware");
const cookieParser = require("cookie-parser");
const { verifyAccessToken } = require("./middlewares/tokenValidate");
const { refreshToken } = require("./controllers/tokenController");
const User = require("./models/userModel");
const {
  signAccessToken,
  signRefreshToken,
  signEmailToken,
} = require("./token");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("./controllers/emailController");

require("dotenv").config();

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

// app.post("/protected", verifyAccessToken, (req, res) =>{

// app.post("/refreshtoken", refreshToken)

app.post("/register", register);

app.post("/login", login);

app.post("/logout", logout);

app.post("/protected", async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new Error("You need to login");
    }

    // console.log(authorization);
    const token = authorization.split(" ")[1];

    let userid = null;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        throw new Error("Token Expired");
      }

      userid = payload.userId;

      // res.send({ data: "This is the protected data", userid: payload.userId });
    });
    const user = await User.findOne({ _id: userid });

    if (user.isVerified == 2) {
      return res.send({
        data: "This is the protected data",
        userid: userid,
        verify: true,
      });
    } else {
      return res.send({
        data: "This is the protected data",
        userid: userid,
        verify: false,
      });
    }
  } catch (error) {
    res.send({ error: error.message });
  }
});

app.post("/refresh_token", async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.send({ error: "Please login again" });

  let userid = null;

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
    if (err) {
      return res.send({ error: "Token invalid !" });
    }

    userid = payload.userId;
  });

  const user = await User.findOne({ _id: userid });

  if (!user || user.refreshtoken !== token) {
    return res.send({ error: "Token invalid !" });
  }

  const accesstoken = await signAccessToken({ userId: userid });

  res.send({ accesstoken, user });
});

app.post("/checkemail", async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.send({ error: "Please login again" });

  let userid = null;

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
    if (err) {
      return res.send({ error: "Token invalid !" });
    }

    userid = payload.userId;
  });

  const user = await User.findOne({ _id: userid });

  const payload = { userId: user._id };

  if (!user.isVerified) {
    const emailtoken = signEmailToken(payload);
    const info = {
      text: emailtoken,
      html: `<a href="http://localhost:5000/token/${emailtoken}" target="_blank"> Verify email </a>`,
    };
    sendEmail(info, user.email);

    const update_user = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { isVerified: 1 } },
      { new: true }
    );

    return res.send({
      message: "Verification Email Sent",
      verify: false,
      code: 0,
    });
  } else if (user.isVerified == 1) {
    return res.send({
      message: "Verification Already Email Sent",
      verify: false,
      code: 1,
    });
  } else if (user.isVerified == 2) {
    return res.send({
      message: "Account Already Registered",
      verify: true,
      code: 2,
    });
  }
});

app.get("/token/:id", async (req, res) => {
  const token = req.params.id;

  if (!token) return res.send({ error: "Some Problem occur !" });

  let userid = null;

  jwt.verify(token, process.env.EMAIL_TOKEN_SECRET, (err, payload) => {
    if (err) {
      return res.send({ error: "Verification Link Expired !" });
    }

    userid = payload.userId;
  });

  const user = await User.findOne({ _id: userid });

  if (user.isVerified == 2) {
    // return res.send({ error: "Already Verified !" });
    return res.redirect("http://localhost:3000/success/already");
  }

  const update_user = await User.findOneAndUpdate(
    { _id: user._id },
    { $set: { isVerified: 2 } },
    { new: true }
  );

  return res.redirect("http://localhost:3000/success/verify");
});

app.post("/resend", async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.send({ error: "Please login again" });

  let userid = null;

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
    if (err) {
      return res.send({ error: "Token invalid !" });
    }

    userid = payload.userId;
  });

  const user = await User.findOne({ _id: userid });

  const payload = { userId: user._id };

  if (user.isVerified == 1) {
    const emailtoken = signEmailToken(payload);
    const info = {
      text: emailtoken,
      html: `<a href="http://localhost:5000/token/${emailtoken}" target="_blank"> Verify email </a>`,
    };
    sendEmail(info, user.email);

    return res.send({
      message: "Verification Email Sent again",
      verify: false,
      code: 0,
    });
  }
});

// mongoose connect

mongoose
  .connect(process.env.MONGO_LINK)
  .then(() => {
    console.log("Database connect successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Serving running at http://localhost:${port}`);
});
