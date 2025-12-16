const {gql} = require("apollo-server-express");


const userType = gql`
enum Role{
    ADMIN
    MEMBER
}

type User{
    id:ID!    
    name: String!
    email:String!
    role: Role!
    createdAt: String
    updatedAt: String
}

type AuthPayload{
    token: String!
    user:User!
}

type Query{
    getUsers:[User]
    getUser(id:ID!): User
}

type Mutation{
    createUser(name:String!, email:String!, password:String!,role:String): AuthPayload
    loginUser(email:String!, password:String!):AuthPayload
    updateUser(id:ID!, name:String, email:String, role:Role ):User
    deleteUser(id:ID!):Boolean

}

`;

module.exports = userType;



