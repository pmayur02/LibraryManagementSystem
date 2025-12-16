const User = require("../models/users");

module.exports.isAdmin = async(id)=>{
    try {
       if(!id) throw new Error("Invalid ID!")
       const user = await User.findById(id);
       if(!user)  throw new Error("No User Found!");
       if(user.role == "ADMIN"){
        return user;
       }else{
         throw new Error("You are not allowed for this  action");
       }
    } catch (error) {
        throw new Error(error.message);
    }
}