import express, { Application } from 'express';
import connectDB from './config/db';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import helpMessageRoutes from './routes/helpMessageRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

// Connect to database
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/contact', helpMessageRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));