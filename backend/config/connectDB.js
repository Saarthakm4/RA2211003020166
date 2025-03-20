import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
    try {
        console.log("🔍 MONGO_URI Loaded:", process.env.MONGO_URI);

        if (!process.env.MONGO_URI) {
            throw new Error("❌ MONGO_URI is not defined in .env file");
        }

        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`.cyan.underline);

        mongoose.connection.on("open", () => {
            console.log("✅ MongoDB connection is open.");
        });

        mongoose.connection.on("error", (err) => {
            console.error(`❌ MongoDB Connection Error: ${err.message}`.red.bold);
        });

    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
};

export default connectDB;
