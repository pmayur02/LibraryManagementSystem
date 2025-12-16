const userResolver = require("./userResolvers");
const userTypeDef = require("./userTypeDefs");
const bookTypeDefs = require("../schemas/booksDefs");
const bookResolver = require("../schemas/booksResolver");
const borrowTypeDefs = require("../schemas/borrowTypeDefs");
const borrowResolver = require("../schemas/borrowResolver");
const reportTypeDefs = require("../schemas/reportTypeDefs");
const reportsResolvers = require("../schemas/reportResolvers");



const typeDefs = [userTypeDef,bookTypeDefs,borrowTypeDefs,reportTypeDefs];
const resolvers = [userResolver,bookResolver,borrowResolver,reportsResolvers];

module.exports = {typeDefs, resolvers};
