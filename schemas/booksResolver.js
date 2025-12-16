const bookService = require("../services/books");
const { isAdmin } = require("../middlewares/admin");


const bookResolver = {
    Query: {
        getBooks: async (_, __, { user }) => {
            if (!user) throw new Error("Unauthorized!");
            return await bookService.getBooks();
        },
        getBook: async (_, { id }, { user }) => {
            if (!user) throw new Error("Unauthorized!");
            return await bookService.getBook(id);
        },
        bookss: async (_, payload, { user }) => {
            if (!user) throw new Error("Unauthorized!");
            return await bookService.bookss(payload);
        },

    },
    Mutation: {
        addBook: async (_, payload, { user }) => {
            if (!user) throw new Error("Unauthorized!");
            let adminData = await isAdmin(user.userId);
            return await bookService.addBook(payload, adminData.id);
        },
        updateBook: async (_, payload, { user }) => {
            if (!user) throw new Error("Unauthorized!");
            let adminData = await isAdmin(user.userId);
            return await bookService.updateBook(payload, adminData.id);
        },
        deleteBook: async (_, payload, { user }) => {
            if (!user) throw new Error("Unauthorized!");
            await isAdmin(user.userId);
            return await bookService.deleteBook(payload);
        }
    }


}

module.exports = bookResolver;