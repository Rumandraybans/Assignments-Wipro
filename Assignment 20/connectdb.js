import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectdb = async () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("Database has been connected"))
        .catch(error => console.log("ERROR: " + error.message)); 
};

export { connectdb };