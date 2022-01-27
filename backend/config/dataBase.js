import mongoose from "mongoose";
import dotenv from "dotenv"
const connectDB = async () =>{
    try{
        console.log(`URI:`.green.underline + ` ${process.env.MONGO_URI}`.underline)
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`.blue.bold)
    } catch(error) {
        console.log(`Error: ${error.message}`.red.bold.underline)
        process.exit(1)
    }
}

export default connectDB