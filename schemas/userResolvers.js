const userService = require("../services/users");
const {isAdmin} = require("../middlewares/admin")


const userResolver = {
    Query:{
        getUsers: async (_,__, {user})=>{
            if(!user) throw new Error("Unauthorized!")
            await isAdmin(user.userId)
            return await userService.getUsers();
        },
        getUser: async(_,{id},{user})=>{
            if(!user) throw new Error("Unauthorized!")
            await isAdmin(user.userId)            
            return await userService.getUser(id);
        }
    },

    Mutation:{
        createUser: async(_,payload)=>{
            return await userService.createUser(payload);
        },
        loginUser: async (_,payload)=>{
            return await userService.loginUser(payload);
        },
        updateUser:async(_,payload,{user})=>{
            if(!user) throw new Error("Unauthorised");
            return await userService.updateUser(payload);
        },
        deleteUser:async(_,{id},{user})=>{
             if(!user) throw new Error("Unauthorised");
             await isAdmin(user.userId)
             return await userService.deleteUser(id,user.userId);
        }
    }
}


module.exports = userResolver;