import express, { Application, Request, Response, NextFunction } from 'express';
import connectDB from './config/db';
import bodyParser from 'body-parser';
import session from 'express-session';
import userRoutes from './routes/userRoutes';
import eventRoutes from './routes/eventRoutes';
import helpMessageRoutes from './routes/helpMessageRoutes';
import authRoutes from './routes/authRoutes'; // Import your auth routes
import dotenv from 'dotenv';
import passport from './config/passport'; // Import your passport configuration

dotenv.config();
console.log('Server is starting...');

const app: Application = express();

// Connect to database
connectDB();

// Meningkatkan limit ukuran payload untuk JSON
app.use(bodyParser.json({ limit: '10mb' }));

// Meningkatkan limit ukuran payload untuk form-urlencoded
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/contact', helpMessageRoutes);
app.use('/api', authRoutes); // Add the route for authentication

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
