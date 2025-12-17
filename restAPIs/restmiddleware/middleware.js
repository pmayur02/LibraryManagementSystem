const jwt = require("jsonwebtoken")
const User = require("../../models/users")


function errorHandler(err,req,res,next){
    console.log(err);
    
    if(err){
        res.status(500).json({"message":"Something went wrong"})
    }
}


function authMiddleware(req,res,next){
try {
        const token = req.get("Authorisation").split(" ")[1];

    if(!token) return res.status(401).json({ message: "Access denied. No token provided." });

    const decoded = jwt.verify(token,process.env.SECRETKEY);
    req.user = decoded
    next();
} catch (error) {
    return res.status(401).json({ message: " Invalid Token!" });
}
}

async function isAdmin(req,res,next){
    try {
        const {userId } = req.user;
        const user = await User.findById(userId );
        if(!user) return res.status(401).json({ message: "Invalid Access." });
        if(user.role == "ADMIN"){
        next();
       }else{
         throw new Error("You are not allowed for this  action");
       }
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}


module.exports = {errorHandler,authMiddleware,isAdmin}


