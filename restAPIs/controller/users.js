const userService = require("../../services/users")
const {responseBody} = require("../utilitiles/utilities")

module.exports.registerUser = async(req,res,next)=>{
    try {
        const payload = req.body;
        const response = await userService.createUser(payload);
        if(!response.user) return res.send(responseBody(500, "Failed to register user!"))
        return res.send(responseBody(200, "User Registered Successfully!",response))
    } catch (error) {
        next(error)
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const payload = req.body;
        const response = await userService.loginUser(payload);
        if (!response.user) return res.send(responseBody(500, "Failed to login user!"))
        return res.send(responseBody(200, "User logged In Successfully!", response))
    } catch (error) {
        next(error)
    }
}


module.exports.getUsers = async(req,res,next)=>{
    try {
        const users = await userService.getUsers();
        if(users.length ==0) return res.send(responseBody(404,"No User Found", users));
        return res.send(responseBody(404,"Users Found!", users))

    } catch (error) {
        next(error)
    }
}

module.exports.getUser = async(req,res,next)=>{
    try {
        const userIdPayload = req.params.id;
        const user = await userService.getUser(userIdPayload);
        if(user.length ==0) return res.send(responseBody(404,"No User Found", user));
        return res.send(responseBody(404,"Users Found!", user))
    } catch (error) {
        next(error)
    }
}

module.exports.updateUser = async(req,res,next)=>{
    try {
        if((!req.body || Object.keys(req.body).length == 0) && req.params.id) return res.status(400).send(responseBody(400, "please enter valid data."));

        const payload = {...req.body, id: req.params.id};
        const response = await userService.updateUser(payload);
        if(!response.id) return res.send(responseBody(500, "Failed to Update User !"))
        return res.send(responseBody(200, "User Updated Successfully!",response))
    } catch (error) {
        next(error)
    }
}

module.exports.deleteUser= async(req,res,next)=>{
    try {
        if(!req.params.id) return res.status(400).send(responseBody(400, "please enter valid data."));

        const response = await userService.deleteUser(req.params.id,req.user.userId);
        if(!response) return res.send(responseBody(500, "Failed to Delete User !"))
        return res.send(responseBody(200, "User Delete Successfully!",response))
    } catch (error) {
        next(error)
    }
}


