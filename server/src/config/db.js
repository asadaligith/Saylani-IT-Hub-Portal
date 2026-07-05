// const dns = require("node:dns");

// dns.setServers(["8.8.8.8", "1.1.1.1"]);
const mongoose = require('mongoose');
const {config} = require('dotenv')
config()

const connectDB = async ()=>{
   try{
     const uri = process.env.MONGO_URI

     console.log("Connecting to MongoDB...");
     console.log("URI exists:", !!uri);
   
    await mongoose.connect(uri, {
       serverSelectionTimeoutMS: 10000,
    })
    console.log("MongoDB Connected")
   }
   catch(error){
        console.error("Database connection failed:", error);
        console.error("ERROR NAME:", error.name);
         console.error("ERROR MESSAGE:", error.message);
         console.error("ERROR CODE:", error.code);
         console.error(error);
   }

};

module.exports = connectDB;
