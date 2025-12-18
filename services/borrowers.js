const Borrow = require("../models/borrower");
const Book = require("../models/books");
// const User = require("../models/users");
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

    // const user = await User.findById(userId);
    //prevent duplicate borrow
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

    const borrowData = await Borrow.findById(borrow._id).populate("book").populate("user");
    return borrowData
  } catch (error) {
    throw new Error(error.message);
  }
};



module.exports.return= async(payload,userId)=>{
    try {
        
      const record = await Borrow.findById(payload);
      if(!record) throw new Error("No Borrow Record Found.")
      if (record.user.toString() !== userId) {
        throw new Error("Unauthorized");
      }

      record.status = "RETURNED";
      record.returnedAt = new Date();
      await record.save();

      const book = await Book.findById(record.book);
      book.availableCopies += 1;
      await book.save();

      return  await Borrow.findById(record._id).populate("book").populate("user");
    } catch (error) {
        throw new Error(error.message);
    }
}


module.exports.mostBorrowedBooks= async (limit) => {
    try {
        if(!limit) limit =10;
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
        if(!limit) limit =10;
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
        $project: {
          title: 1,
          totalCopies: 1,
          availableCopies: 1,
          borrowedCopies: {
            $subtract: ["$totalCopies", "$availableCopies"]
          }
        }
      }
    ]);

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
