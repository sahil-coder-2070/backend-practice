import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(
            `MongoDB Connected !! DB Host ${connection.connection.host}`
        );
    } catch (error) {
        console.log(`ERROR: `, error);
        throw error
    }
}

export default connectDB;