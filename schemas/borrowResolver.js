const borrowService = require("../services/borrowers")
const {isAdmin} = require("../middlewares/admin");

const borrowResolvers = {
  Query: {
    borrowHistory: async(_, __, { user }) => {
      if (!user) throw new Error("Unauthorized");
      return await borrowService.borrowHistory(user.userId) 
    }
  },

    Mutation: {
    borrow: async (_, { id }, { user }) => {
      if (!user) throw new Error("Unauthorized");
      await isAdmin(user.userId);
      return await borrowService.borrow(id,user.userId); 
    },

    return: async (_, { id }, { user }) => {
      if (!user) throw new Error("Unauthorized");
      await isAdmin(user.userId);
      return await borrowService.return(id,user.userId);
    }
  }
};

module.exports = borrowResolvers;
