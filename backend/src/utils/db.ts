import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI || '');
        console.log(`MongoDB connect to ${conn.connection.db.databaseName}`)
    } catch (error) {
        console.log(error)   
    }
}

export default connectDB