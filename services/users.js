const User = require("../models/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Borrow = require("../models/borrower");

module.exports.createUser = async (payload) => {
    try {
        if(!payload.email) throw new Error("email required.");
        const exists = await User.findOne({ email:payload.email })
        if (exists) throw new Error("User already Exists!");
        const hashedpassword = await bcrypt.hash(payload.password, 10)
        payload.password = hashedpassword
        const user = new User(payload);

        await user.save()

        const token = jwt.sign({
            userId: user.id
        }, process.env.SECRETKEY, { expiresIn: "1d" })

        return { token, user };
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports.getUsers = async()=>{
    try {
        const users = await User.find().sort({createdAt:-1});
        if(!users) return [];
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports.getUser = async(id)=>{
    try {
        if(!id) throw new Error("enter valid user id.")
        const users = await User.findById(id);
        if(!users) return [];
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
}




module.exports.loginUser = async(payload)=>{
    try {
        if(!payload.email) throw new Error("valid email required");
        const exists = await User.findOne({ email:payload.email })
        if (!exists) throw new Error("No User Found!");
         
        const validPass = await bcrypt.compare(payload.password,exists.password)
        if(!validPass) throw new Error("Invalid Credentials")
        
        const token = jwt.sign({
            userId: exists.id
        },process.env.SECRETKEY, { expiresIn: "1d" });

        return {token, user:exists}

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports.updateUser = async(payload)=>{
    try {
    const updates = {};

      if (payload.name) updates.name = payload.name;
      if (payload.email){
        const exists =await User.findOne({email:payload.email, _id:{$ne:payload.id}})
        if(exists) throw new Error("user with same email already exists");
        updates.email = payload.email;
      } 
      return await User.findByIdAndUpdate(payload.id,updates,{new:true});

      
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports.deleteUser = async (id, userId) => {
    try {

        if (id === userId) {
            throw new Error("Admin cannot delete themselves");
        }

        const existingUser = await User.findById(id);
        if (!existingUser) {
            throw new Error("User not found");
        }

        // user must not have active borrows
        const activeBorrows = await Borrow.countDocuments({
            user: id,
            status: "BORROWED",
        });

        if (activeBorrows > 0) {
            throw new Error(
                "User has active borrowed books."
            );
        }

        await User.findByIdAndDelete(id);

        return true;


    } catch (error) {
        throw new Error(error.message);
    }
}