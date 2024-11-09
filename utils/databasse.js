import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true); // Use strict query mode

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "promptgenius", // Ensure this matches your MongoDB setup
            // Removed deprecated options
        });

        isConnected = true;
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error); // Log any connection errors
        throw new Error('MongoDB connection failed'); // Rethrow for handling
    }
};
