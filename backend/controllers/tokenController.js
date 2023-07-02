const { verifyRefreshToken, signAccessToken } = require("../common/token");


module.exports.refreshToken  = async (req, res) => {
    

    const auth = req.headers.refreshtoken;
    console.log(auth);
    if (!auth) return res.status(401).json({ status: false, error: "No token provided" });
  
    const token = auth.split(" ")[1];

    verifyRefreshToken(token).then( async (userId)=>{
        
        const accesstoken = await signAccessToken({userId});

        res.status(200).json({ userId, accesstoken });

    }).catch((err) => {
        res.status(500).json({ error: err });
    })



}