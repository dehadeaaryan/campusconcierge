import mongoose from "mongoose";

let isConnected = false;

export default async function dbConnect() {
    if (isConnected) return;

    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        isConnected = true;
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection error:", error);
    }
}
