const { gql } = require("apollo-server-express");

const bookTypeDefs = gql`

type Book {
  id: ID!
  title: String!
  author: String!
  isbn: String!
  publicationDate: String!
  genre: String!
  totalCopies: Int!
  availableCopies: Int!
}

type Query {
  getBooks: [Book]
  getBook(id:ID!):Book
  bookss(page: Int limit: Int genre: String author: String): [Book]
}

type Mutation{
    addBook(
    title: String!
    author: String!
    isbn: String!
    publicationDate: String
    genre: String
    totalCopies: Int!
    availableCopies: Int!
  ): Book

    updateBook(
    id: ID!
    title: String
    author: String
    genre: String
    totalCopies: Int
    availableCopies: Int
   ): Book

   deleteBook(id: ID!): Boolean

}
`;


module.exports = bookTypeDefs;