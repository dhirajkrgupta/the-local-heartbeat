import mongoose from "mongoose";


const connectDB=async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("database connected");
    } catch (error) {
        throw error;
    }
}

export default connectDB;