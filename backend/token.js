const jwt = require("jsonwebtoken");

module.exports.signAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

module.exports.signRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "10d",
  });
};

module.exports.signEmailToken = (payload) => {
  return jwt.sign(payload, process.env.EMAIL_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

module.exports.verifyRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
      if (err) reject(err);

      resolve(payload.userId);
    });
  });
};

module.exports.generate_token = (payload, secret, time) => {
  const token = jwt.sign(payload, secret, { expiresIn: time });

  return token;
};
