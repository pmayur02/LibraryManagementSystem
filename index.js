require("dotenv").config()
const express = require("express")
const {ApolloServer} = require("apollo-server-express");
const {typeDefs,resolvers} = require("./schemas/index");
const connectDB = require("./dbConnection/dbConnection")
const authMiddleware = require("./middlewares/auth")


const PORT = process.env.PORT || 8800

async function startServer(){
    const app = express()

    await connectDB(process.env.DBURL);
    const server = new ApolloServer({
         typeDefs,
         resolvers,
        context: ({req})=>{
            const user = authMiddleware(req);
            return {user};
        }
    })

    await server.start()
    server.applyMiddleware({app})

    app.listen(PORT,()=>{
        console.log(`running on ${PORT}`);
    })
}

startServer();