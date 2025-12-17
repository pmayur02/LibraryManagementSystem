const bookService = require("../../services/books");
const borrowService = require("../../services/borrowers");
const {responseBody} = require("../utilitiles/utilities")

module.exports.addBook = async(req,res,next)=>{
    try {
        const payload = req.body
        if(!payload || Object.keys(payload).length ==0) throw new Error("Enter valid Data.")
        const response = await bookService.addBook(payload,req.user.userId)
        if(!response) return res.send(responseBody(400,"Failed to add book."))
        return res.send(responseBody(200,"Book addded successfully."))
    } catch (error) {
        next(error)
    }
}

module.exports.getBooks = async(req,res,next)=>{
    try {
        const response = await bookService.getBooks()
        if(!response) return res.send(responseBody(404,"No Books Found."))
        return res.send(responseBody(200,"Books Fetched successfully.",response))
    } catch (error) {
        next(error)
    }
}

module.exports.getBook = async(req,res,next)=>{
    try {
        const bookId = req.params.id;
        if(!bookId) throw new Error("Enter valid bookId.")
        const response = await bookService.getBook(bookId);
        if(!response) return res.send(responseBody(404,"No Books Found."))
        return res.send(responseBody(200,"Books Fetched successfully.",response))
    } catch (error) {
        next(error)
    }
}

module.exports.updateBook = async(req,res,next)=>{
    try {
        const payload = {...req.body, id:req.params.id}
        if(!payload || Object.keys(payload).length ==0 || !req.body) throw new Error("Enter valid Data.")
        const response = await bookService.updateBook(payload,req.user.userId);
        return res.send(responseBody(200,"book details updated successfully!"));
    } catch (error) {
        next(error)
    }
}

module.exports.deleteBook = async(req,res,next)=>{
    try {
        const bookId = req.params
        if(!bookId) throw new Error("Enter valid bookId.") 
        const response = await bookService.deleteBook(bookId);
        if(!response) return res.send(responseBody(400,"Failed to delete book!"));
        return res.send(responseBody(200,"book details updated successfully!"));
    } catch (error) {
        next(error)
    }
}

module.exports.borrow = async(req,res,next)=>{
    try {
        const bookId = req.params.id
        if(!bookId) throw new Error("Enter valid bookId.")
        const response = await borrowService.borrow(bookId,req.user.userId);
        if(!response) return res.send(responseBody(400,"Failed to borrow book!"));
        return res.send(responseBody(200,"book borrowed successfully!"));
    } catch (error) {
        next(error)
    }
}

module.exports.return = async(req,res,next)=>{
    try {
        const bookId = req.params.id
        if(!bookId) throw new Error("Enter valid bookId.")
        const response = await borrowService.return(bookId,req.user.userId);
        if(!response) return res.send(responseBody(400,"Failed to return book!"));
        return res.send(responseBody(200,"book returned successfully!"));
    } catch (error) {
        next(error)
    }
}

module.exports.borrowHistory = async(req,res,next)=>{
    try {
        const userId = req.user.userId
        if(!userId) throw new Error("Enter valid userId.")
        const response = await borrowService.borrowHistory(userId);
        if(!response) return res.send(responseBody(400,"Failed to fetch books!"));
        return res.send(responseBody(200,"Books fetched successfully!",response));
    } catch (error) {
        next(error)
    }
}

module.exports.mostBorrowedBooks = async(req,res,next)=>{
    try {
        const limit = parseInt(req.query.limit)
        if(!limit) throw new Error("Enter valid limit.")
        const response = await borrowService.mostBorrowedBooks(limit);
        if(!response) return res.send(responseBody(400,"Failed to fetch books!"));
        return res.send(responseBody(200,"Books fetched successfully!",response));
    } catch (error) {
        next(error)
    }
}

module.exports.activeMembers = async(req,res,next)=>{
    try {
        const limit = parseInt(req.query.limit)
        if(!limit) throw new Error("Enter valid limit.")
        const response = await borrowService.activeMembers(limit);
        if(!response) return res.send(responseBody(400,"Failed to fetch members!"));
        return res.send(responseBody(200,"member fetched successfully!",response));
    } catch (error) {
        next(error)
    }
}

module.exports.bookAvailabilityReport = async(req,res,next)=>{
    try {
        const response = await borrowService.bookAvailabilityReport();
        return res.send(responseBody(200,"Data fetched successfully!",response));
    } catch (error) {
        next(error)
    }
}



