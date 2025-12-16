const mongoose = require("mongoose");



async function connectDB(url){
    try {
        if(!url) throw Error("db config required!");
        await mongoose.connect(url);
        console.log("db connected successfully!");
        
    } catch (error) {
        throw new Error(error.message);
    }
}


module.exports = connectDB;