const router = require("express").Router();
const userController = require("../controller/users");
const {isAdmin,authMiddleware} = require("../restmiddleware/middleware");



router.post("/registeruser",userController.registerUser);
router.post("/login",userController.login)
router.get("/getusers",authMiddleware,isAdmin,userController.getUsers)
router.get("/getuser/:id",authMiddleware,isAdmin,userController.getUser)
router.put("/updateuser/:id",authMiddleware,isAdmin,userController.updateUser)
router.delete("/deleteuser/:id",authMiddleware,isAdmin, userController.deleteUser);


module.exports = router;
