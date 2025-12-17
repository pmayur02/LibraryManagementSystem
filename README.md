# 📚 Library Management System (GraphQL)

This project is a Library Management System backend built using  Node.js, Express, Apollo Server (GraphQL), and MongoDB (Mongoose).

All API interactions are performed using Apollo Sandbox by accessing
the GraphQL endpoint directly.

---

## 🚀 Tech Stack

- Node.js
- Express
- Apollo Server Express
- MongoDB + Mongoose
- JWT Authentication
- Apollo Sandbox (for API testing & documentation)

---

## How to Run the Project

### Install Dependencies
npm install

Create a .env file:
DBURL=mongodb://localhost:27017/libraryMS
PORT=8800
SECRETKEY=LIBSYSTEM

Start the Server
node index.js


Open GraphQL SandBox

http://localhost:{PORT}/graphql

Overall User Flow

START
  |
  |-- Register
  |
  |-- Login
  |     |
  |     |-- JWT Token Issued
  |     |
  |     |-- Role Identified (ADMIN / MEMBER)
  |
  |-----------------------------
  |                             |
ADMIN FLOW                   MEMBER FLOW


Login Flow

User
 |
 | login(email, password)
 |
 ↓
Credentials validated
 |
 ↓
JWT generated
 |
 ↓
Token copied to Apollo Playground headers

ADMIN Flow

ADMIN User
 |
 |-- addBook
 |-- updateBook
 |-- deleteBook
 |-- getBooks
 |-- getBook
 |-- viewReports
 |
 ↓
Admin-only access enforced in resolvers

MEMBER Flow

MEMBER User
 |
 |-- getBooks
 |-- getBook
 |-- borrowBook
 |-- returnBook
 |-- myBorrowHistory
 |
 ↓
Member-only access enforced

http://localhost:8800/graphql

--------------------------------------------------------------------------------------------------------------------------
// create user 

mutation CreateUser($name: String!, $email: String!, $password: String!, $role: String) {
  createUser(name: $name, email: $email, password: $password, role: $role) {
    user {
      email
      name
    }
  }
}

// payload 

{  "name": "Garry Mane",
  "email": "garry@example.com",
  "password": "garry123"
}

--------------------------------------------------------------------------------------------------------------------------
// login user
mutation Mutation($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    token
    user {
      name
      email
    }
  }
}

// payload
{  "email": "harry@test.com",
  "password": "harry123"
}

--------------------------------------------------------------------------------------------------------------------------
# Only Admin can access Users. So you need token of admin role to be passed in authorisation header.

query GetUsers {
  getUsers {
    id
    name
    email
  }
} 


query GetUser($getUserId: ID!){
  getUser(id: $getUserId) {
    id
    name
    email
  }
}

// get a specific user payload
{
  "getUserId": "69412d85e2b9e86e2b946892"
}



--------------------------------------------------------------------------------------------------------------------------
# Update User
# Only Admin can update Users. So you need token of admin role to be passed in authorisation header.

mutation UpdateUser($updateUserId: ID!, $email: String) {
  updateUser(id: $updateUserId, email: $email) {
    email
    name
    createdAt
    updatedAt
  }
};

// update user payload
{
  "updateUserId": "69412d85e2b9e86e2b946892",
  "email": "harry@test.com"
}

--------------------------------------------------------------------------------------------------------------------------
# Delete User
# Only Admin can update Users. So you need token of admin role to be passed in authorisation header.

mutation DeleteUser($deleteUserId: ID!) {
  deleteUser(id: $deleteUserId)
}

// delete user payload
{
  "deleteUserId": "69412da3e2b9e86e2b946895"
}

--------------------------------------------------------------------------------------------------------------------------

# Add Book
# Only Admin can add Books. So you need token of admin role to be passed in authorisation header.

mutation AddBook($title: String!, $author: String!, $isbn: String!, $totalCopies: Int!, $availableCopies: Int!, $publicationDate: String, $genre: String) {
  addBook(title: $title, author: $author, isbn: $isbn, totalCopies: $totalCopies, availableCopies: $availableCopies, publicationDate: $publicationDate, genre: $genre) {
    title
    author
    genre
    totalCopies
    availableCopies
  }
}

Payload
 {
    "title": "Cloud Computing Essentials",
    "author": "Mark Thompson",
    "isbn": "978-0-123456-10-3",
    "totalCopies": 22,
    "availableCopies": 22,
    "publicationDate": "2021-07-30",
    "genre": "Cloud Computing"
  }

--------------------------------------------------------------------------------------------------------------------------

# get all Books
query GetBooks {
  getBooks {
    title
    author
    genre
    availableCopies
  }

}

# get a single book 
query GetBook($getBookId:ID!) {
  getBook(id: $getBookId) {
    title
    author
    genre
    availableCopies
  }
  }




# get books based on filter/ pagination

query Bookss($page: Int, $limit: Int, $genre: String) {
  bookss(page: $page, limit: $limit, genre: $genre) {
    title
    author
    availableCopies
    genre
  }
}


payload -


// get a single book 
{
  "getBookId": "6941371a33d552f678a6c4c6"
}
// Bookss payload
{
    "page": 1,
  "limit": 3,
  "genre": "Fiction"
}

--------------------------------------------------------------------------------------------------------------------------

// update book

# Only Admin can update Book. So you need token of admin role to be passed in authorisation header.

mutation UpdateBook($updateBookId: ID!, $genre: String, $availableCopies: Int! ) {
  updateBook(id: $updateBookId, genre: $genre, availableCopies: $availableCopies) {
    title
    genre
    author
  }
  
}

// update book payload
{
  "updateBookId": "694136f033d552f678a6c4c3",
  "genre": "Technology",
  "availableCopies": 20
}

--------------------------------------------------------------------------------------------------------------------------
// delete book

# Only Admin can update Books. So you need token of admin role to be passed in authorisation header.

mutation DeleteBook($deleteBookId: ID!) {
  deleteBook(id: $deleteBookId)
}

// delete book payload
{
  "deleteBookId": "694137a633d552f678a6c4d8"
}


--------------------------------------------------------------------------------------------------------------------------
//borrow book

mutation Borrow($borrowId: ID!) {
  borrow(id: $borrowId) {
    book {
      title
      author
      genre
      availableCopies
      totalCopies
    }
  }
}

// payload
// bookId
{
  "borrowId": "694136c433d552f678a6c4c0"
}
--------------------------------------------------------------------------------------------------------------------------
// return book

mutation Return($returnId: ID!) {
  return(id: $returnId) {
    book {
      title
      isbn
    }
    borrowedAt
    returnedAt
  }
}

// return book payload
{
  "returnId": "69414d12e063fbac656ee8ff"
}
--------------------------------------------------------------------------------------------------------------------------
query MostBorrowedBooks($limit: Int) {
  mostBorrowedBooks(limit: $limit) {
    book {
      title
    }
  }
}

// payload
{
  "limit": 10
}
--------------------------------------------------------------------------------------------------------------------------
query BookAvailabilityReport {
  bookAvailabilityReport {
    availableBooks
    borrowedBooks
    totalBooks
  }
}
--------------------------------------------------------------------------------------------------------------------------




