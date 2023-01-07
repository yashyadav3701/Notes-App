var jwt = require('jsonwebtoken');
const JWT_SECRET="yashyadav";

const fetchuser=(req,res,next)=>{
    // get id from token and give this id to req
    const token=req.header('auth-token');
    if(!token){
        return res.status(401).send("please use a vaid token");
    }
    try {
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
    } catch (error) {
        return res.status(401).send("please use a vaid token");
    }
    next();
}

module.exports=fetchuser;