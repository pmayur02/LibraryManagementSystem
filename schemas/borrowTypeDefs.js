const {gql} = require("apollo-server-express")

const borrowTypeDefs = gql`
type Borrow {
  id: ID!
  book: Book
  user: User!
  borrowedAt: String!
  returnedAt: String
  status: String!
}

type Query {
  borrowHistory: [Borrow]
}

type Mutation {
  borrow(id: ID!): Borrow
  return(id: ID!): Borrow
}
`;

module.exports = borrowTypeDefs;
