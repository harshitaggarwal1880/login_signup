const jwt = require("jsonwebtoken");

module.exports.verifyAccessToken = (req, res, next) => {
  

  const accessToken = req.headers.accessToken || req.body.accessToken;
  
  if(!accessToken){
    return res.status(204).json({status: true, error: "No Token Provided" });
  }
  
  if( accessToken?.startsWith('Bearer')){
    accessToken = accessToken.split(" ")[1];
  }
    

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({status: true, error: "Token Expired" });
    }
    req.payload = payload;
    next();
  });
};
