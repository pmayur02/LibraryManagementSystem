const Borrow = require("../models/borrower");
const Book = require("../models/books");
const mongoose = require("mongoose");


module.exports.borrowHistory = async(userId)=>{
    try {
        let borrowedBooks = await Borrow.find({
      user: new mongoose.Types.ObjectId(userId)
    }).populate("book");
        return borrowedBooks;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports.borrow = async (bookId, userId) => {
  try {
    const book = await Book.findById(bookId);
    if (!book) throw new Error("Book not available");

    if (book.availableCopies <= 0) {
      throw new Error("Book not available");
    }

    // Optional: prevent duplicate borrow
    const alreadyBorrowed = await Borrow.findOne({
      user: userId,
      book: bookId,
      status: "BORROWED",
    });
    if (alreadyBorrowed) {
      throw new Error("You have already borrowed this book");
    }

    const borrow = await Borrow.create({
      user: userId,
      book: bookId,
    });

    book.availableCopies -= 1;
    await book.save();

    return {borrow, book};
  } catch (error) {
    throw new Error(error.message);
  }
};



module.exports.return= async(payload,userId)=>{
    try {
        
      const record = await Borrow.findById(payload);
      if (record.user.toString() !== userId) {
        throw new Error("Unauthorized");
      }

      record.status = "RETURNED";
      record.returnedAt = new Date();
      await record.save();

      const book = await Book.findById(record.book);
      book.availableCopies += 1;
      await book.save();

      return  await Borrow.findById(record._id).populate("book");
    } catch (error) {
        throw new Error(error.message);
    }
}


module.exports.mostBorrowedBooks= async (limit) => {
    try {
        const result = await Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    borrowCount: { $sum: 1 },
                },
            },
            { $sort: { borrowCount: -1 } },
            { $limit: limit },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "book",
                },
            },
            { $unwind: "$book" },
        ]);

        if(!result) return [];

        return result.map((item) => ({
            book: item.book,
            borrowCount: item.borrowCount,
        }));
    } catch (error) {
        throw new Error(error.message);
    }
}


module.exports.activeMembers = async (limit) => {
    try {
        const result = await Borrow.aggregate([
            {
                $group: {
                    _id: "$user",
                    borrowCount: { $sum: 1 },
                },
            },
            { $sort: { borrowCount: -1 } },
            { $limit: limit },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user",
                },
            },
            { $unwind: "$user" },
        ]);

        if(!result) return [];
        return result.map((item) => ({
            user: item.user,
            borrowCount: item.borrowCount,
        }));
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports.bookAvailabilityReport = async () => {
    try {
        const result = await Book.aggregate([
            {
                $group: {
                    _id: null,
                    totalBooks: { $sum: "$totalCopies" },
                    availableBooks: { $sum: "$availableCopies" },
                },
            },
            {
                $project: {
                    _id: 0,
                    totalBooks: 1,
                    availableBooks: 1,
                    borrowedBooks: {
                        $subtract: ["$totalBooks", "$availableBooks"],
                    },
                },
            },
        ]);

        return result[0] || {
            totalBooks: 0,
            availableBooks: 0,
            borrowedBooks: 0,
        };

    } catch (error) {
        throw new Error(error.message);
    }
}