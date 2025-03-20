import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js'; // ✅ Corrected import
import colors from 'colors';
import productRoutes from './routes/product.route.js'; // ✅ Corrected path

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json()); // ✅ Middleware to parse JSON data

// Use product routes
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server started at http://localhost:${PORT}`.yellow.bold);
});
