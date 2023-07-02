const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendEmail = require("./emailController");
const jwt = require("jsonwebtoken");
const { signAccessToken, signRefreshToken } = require("../common/token");

module.exports.register = async (req, res) => {
  const { username, useremail, userpassword } = req.body;
  try {
    const emailCheck = await User.findOne({ email: useremail });
    if (emailCheck) {
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);

    const Securedpassword = await bcrypt.hash(userpassword, salt);

    const user = await User.create({
      name: username,
      email: useremail,
      password: Securedpassword,
    });

    const payload = { userId: user._id };

    const accesstoken = signAccessToken(payload);
    const refreshtoken = signRefreshToken(payload);

    const update_user = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { refreshtoken: refreshtoken } },
      { new: true }
    );

    res.cookie("refreshToken", refreshtoken, {
      //   httpOnly: true,
      maxAge: 10* 24 * 60 * 60 * 1000,
      //   path: "/refresh_token",
    });

    // const emailtoken = signEmailToken(payload);
    // const info = {
    //   text: emailtoken,
    //   html: `<a href="http://localhost:5000/token/${emailtoken}" target="_blank"> Verify email </a>`,
    // };
    // sendEmail(info);
    // return res.send({ error: "Verification mail Sent", verify: false });

    res.send({ message: "Registered Successfully", user: update_user, accesstoken });
  } catch (error) {
    res.send({ error: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { useremail, userpassword } = req.body;

    const user = await User.findOne({ email: useremail });
    if (!user) {
      throw new Error("User not found");
    }

    const passwordcompare = await bcrypt.compare(userpassword, user.password);
    if (!passwordcompare) {
      throw new Error("Invalid Credentials");
    }

    const payload = { userId: user._id };

    const accesstoken = signAccessToken(payload);
    const refreshtoken = signRefreshToken(payload);

    const update_user = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { refreshtoken: refreshtoken } },
      { new: true }
    );

    res.cookie("refreshToken", refreshtoken, {
      //   httpOnly: true,
      maxAge: 10* 24 * 60 * 60 * 1000,
      //   path: "/refresh_token",
    });

    // if (!user.isVerified) {
    //   const emailtoken = signEmailToken(payload);
    //   const info = {
    //     text: emailtoken,
    //     html: `<a href="http://localhost:5000/token/${emailtoken}" target="_blank"> Verify email </a>`,
    //   };
    //   sendEmail(info);
    //   return res.send({ error: "Verification mail Sent", verify: false });
    // }
    if (user.isVerified==2) {
      res.send({
        accesstoken,
        user: update_user,
        message: "Login Successfully",
        verify: true,
      });
    } else {
      res.send({
        accesstoken,
        user: update_user,
        message: "Please Verify your email !",
        verify: false,
      });
    }
  } catch (error) {
    res.send({ error: error.message });
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.send({ message: "Logged out." });
};
