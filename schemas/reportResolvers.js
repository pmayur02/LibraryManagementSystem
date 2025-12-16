const {isAdmin} = require("../middlewares/admin");
const borrowService = require("../services/borrowers")

const reportsResolvers = {
  Query: {
    mostBorrowedBooks: async (_, { limit }, { user }) => {
        if(!user) throw new Error("Unauthorized!");
        await isAdmin(user.userId);
        return await borrowService.mostBorrowedBooks(limit);


    },

    activeMembers: async (_, { limit }, { user }) => {
        if(!user) throw new Error("Unauthorized!");
        await isAdmin(user.userId);
        return await borrowService.activeMembers(limit);
    },

    bookAvailabilityReport: async (_, __, { user }) => {
        if(!user) throw new Error("Unauthorized!");
        await isAdmin(user.userId);

        return await borrowService.bookAvailabilityReport();
    },
  },
};

module.exports = reportsResolvers;
