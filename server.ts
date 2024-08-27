import express, { Application, Request, Response, NextFunction } from 'express';
import connectDB from './config/db';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import eventRoutes from './routes/eventRoutes';
import transactionRoutes from './routes/transactionRoutes';
import helpMessageRoutes from './routes/helpMessageRoutes';
import authRoutes from './routes/authRoutes'; // Import your auth routes
import dotenv from 'dotenv';
import passport from './config/passport'; // Import your passport configuration
import cors from 'cors'; // Import cors

dotenv.config();
console.log('Server is starting...');

const app: Application = express();

// Connect to database
connectDB();

// Configure CORS
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin (frontend)
    methods: 'GET,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies or other credentials to be sent
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions)); // Use CORS middleware

// Meningkatkan limit ukuran payload untuk JSON
app.use(bodyParser.json({ limit: '10mb' }));

// Meningkatkan limit ukuran payload untuk form-urlencoded
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Passport middleware
app.use(passport.initialize());

// Routes
app.use('/api', authRoutes); // Add the route for authentication
app.use('/api/users', userRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/contact', helpMessageRoutes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));