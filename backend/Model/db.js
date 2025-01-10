import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const mongo_url = process.env.MONGO_URL;

if (!mongo_url) {
    throw new Error("Mongodb url is not defined,check your .env file")
}   
mongoose.connect(mongo_url)
    .then(() => {
        console.log("MongoDB connected");
    }).catch((err) => {
        console.log("MongoDB connection error", err);
    })


