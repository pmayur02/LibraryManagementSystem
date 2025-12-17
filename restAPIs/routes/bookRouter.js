const router = require("express").Router();
const bookController = require("../controller/books");
const {authMiddleware,isAdmin} = require("../restmiddleware/middleware")

router.post("/addbook",authMiddleware,isAdmin,bookController.addBook)
router.get("/getbooks",authMiddleware,bookController.getBooks)
router.get("/getbook/:id",authMiddleware,bookController.getBook)
router.put("/updatebook/:id",authMiddleware,isAdmin,bookController.updateBook)
router.delete("/deletebook/:id",authMiddleware,isAdmin,bookController.deleteBook)
router.get("/borrow/:id",authMiddleware,isAdmin, bookController.borrow)
router.get("/return/:id",authMiddleware,isAdmin, bookController.return)
router.get("/borrowHistory",authMiddleware,isAdmin,bookController.borrowHistory)
router.get("/mostBorrowedBooks",authMiddleware,isAdmin,bookController.mostBorrowedBooks)
router.get("/activeMembers",authMiddleware,isAdmin,bookController.activeMembers)
router.get("/bookAvailabilityReport",authMiddleware,isAdmin,bookController.bookAvailabilityReport)

module.exports = router
