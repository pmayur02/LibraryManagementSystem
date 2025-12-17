const router = require("express").Router();
const userRoutes = require("./userRouter");
const bookRoutes = require("./bookRouter");

router.use("/user",userRoutes);
router.use("/book",bookRoutes);

module.exports = router;