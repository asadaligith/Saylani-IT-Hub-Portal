const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const uri2 = process.env.MONGO_URI_2;
const cleanedUri2 = uri2.replace('<', '').replace('>', '');

console.log("Testing connection with cleaned MONGO_URI_2...");

mongoose.connect(cleanedUri2, {
    serverSelectionTimeoutMS: 5000
})
.then(() => {
    console.log("SUCCESSFULLY CONNECTED");
    process.exit(0);
})
.catch(err => {
    console.error("CONNECTION FAILED:", err);
    process.exit(1);
});
