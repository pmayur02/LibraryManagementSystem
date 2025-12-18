const Book = require("../models/books")

module.exports.addBook = async (payload, adminId) => {
    try {
        if (!payload.title || !payload.author || !payload.isbn || !payload.publicationDate ||
            !payload.genre || !payload.totalCopies || !payload.availableCopies
        ) throw new Error("enter valid data.");

        if(payload.availableCopies > payload.totalCopies) throw new Error("available copies cannot be more than total copies.");

        payload = { ...payload, publicationDate: new Date(payload.publicationDate),adminId: adminId }
        const book = new Book(payload);



        await book.save()
        return book;

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports.getBooks = async () => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        if (!books) return [];
        return books;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports.getBook = async (id) => {
    try {
        const book = await Book.findById(id);
        if (!book) return "No Book found!";
        return book;
    } catch (error) {
        throw new Error(error.message);
    }
}


module.exports.bookss = async (payload) => {
    try {
        const filter = {};
        if(!payload.page) payload.page = 1;
        if(!payload.limit) payload.limit = 10;
        if (payload.genre) filter.genre = payload.genre;
        if (payload.author) filter.author = payload.author;
        return Book.find(filter).skip((payload.page - 1) * payload.limit).limit(payload.limit);
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports.updateBook = async (payload,adminId) => {
    try {
        let updates = {};
        if(!payload.id) throw new Error("enter book Id");
        if (payload.title) updates.title = payload.title;
        if (payload.author) updates.author = payload.author;
        if (payload.genre) updates.genre = payload.genre;
        if (payload.totalCopies) updates.totalCopies = payload.totalCopies;
        if (payload.availableCopies) updates.availableCopies = payload.availableCopies;
        updates = { ...updates, adminId: adminId }

        return await Book.findByIdAndUpdate(payload.id, updates, { new: true });


    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports.deleteBook = async (payload) => {
    try {
        await Book.findByIdAndDelete(payload.id);
        return true;
    } catch (error) {
        throw new Error(error.message);
    }
}