import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes/userRoutes.js';

dotenv.config();

const app = express();

// Parse PORT to an integer to protect against accidental string formats
// const PORT = parseInt(process.env.PORT, 10) || 8000;
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mean';

const PORT = parseInt(process.env.PORT, 10) || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://mongodb:2UndYWPYrGyK8uCh@cluster0.1grqc5e.mongodb.net/Cluster0';


// Middleware
app.use(cors());
app.use(express.json()); // Built-in express JSON parser

// Routes (mount routes before listening)
app.use("/api", routes);

// Database Connection & Server Listener
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });