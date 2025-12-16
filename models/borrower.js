const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  borrowedAt: { type: Date, default: Date.now },
  returnedAt: Date,
  status: {
    type: String,
    enum: ["BORROWED", "RETURNED"],
    default: "BORROWED",
  },
});


module.exports = mongoose.model("Borrower",borrowSchema);