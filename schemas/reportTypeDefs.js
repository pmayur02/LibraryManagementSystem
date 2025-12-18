const {gql} = require("apollo-server-express")


const reportsTypeDefs = gql`
type MostBorrowedBook {
  book: Book!
  borrowCount: Int!
}

type ActiveMember {
  user: User!
  borrowCount: Int!
}

type BookAvailabilityReport {
  totalCopies: Int!
  borrowedCopies: Int!
  availableCopies: Int!
}

type Query {
  mostBorrowedBooks(limit: Int): [MostBorrowedBook]
  activeMembers(limit: Int): [ActiveMember]
  bookAvailabilityReport: [BookAvailabilityReport]
}
`;

module.exports = reportsTypeDefs;
