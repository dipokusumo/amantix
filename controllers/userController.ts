import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import Token from '../models/Token';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import transporter from '../config/mailer';

const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { phone, email, username, password } = req.body;

    try {
        // Check if phone already exists
        let user: IUser | null = await User.findOne({ phone });
        if (user) {
            res.status(400).json({ message: 'Phone number is already in use' });
            return;
        }

        // Check if email already exists
        user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ message: 'Email is already in use' });
            return;
        }

        // Check if username already exists
        user = await User.findOne({ username });
        if (user) {
            res.status(400).json({ message: 'Username is already in use' });
            return;
        }

        // Create new user
        user = new User({ phone, email, username, password });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Generate verification token
        const verificationToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '10m' });
        user.verificationToken = verificationToken;

        // Save user to database
        await user.save();

        // Send verification email
        const verificationLink = `http://localhost:5000/api/users/verify-email/${verificationToken}`; // Ubah ke menggunakan parameter

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification',
            html: `<p>Click the link below to verify your email:</p><p><a href="${verificationLink}">Verify Email</a></p>`,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'User registered successfully. Please check your email for verification link.' });
    } catch (err: unknown) {
        if (err instanceof Error) {
            if (err.name === 'ValidationError') {
                const messages = Object.values((err as any).errors).map((val: any) => val.message);
                res.status(400).json({ message: messages });
            } else {
                console.error(err.message);
                res.status(500).json({ message: 'Server error' });
            }
        } else {
            console.error('An unknown error occurred');
            res.status(500).json({ message: 'Server error' });
        }
    }
};

const verifyEmail = async (req: Request, res: Response) => {
    const { token } = req.params; // Ambil token dari params

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as any;
        const userId = decoded.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        user.isVerified = true;
        user.verificationToken = null;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Invalid token or token expired', error: err });
    }
};

const loginUser = async (req: Request, res: Response) => {
    const { emailOrUsername, password } = req.body;

    try {
        const user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] }).exec();

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if the user has verified their email
        if (!user.isVerified) {
            return res.status(403).json({ message: 'Please verify your email to login' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'default_secret',
            { expiresIn: '1h' }
        );

        // Save the token in the database
        const newToken = new Token({
            token,
            userId: user._id,
            expiresAt: new Date(Date.now() + 3600000) // Token expires in 1 hour
        });

        await newToken.save();

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
};

const logoutUser = async (req: Request, res: Response) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token is required' });

    try {
        await Token.deleteOne({ token });
        res.json({ message: 'Logged out successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error logging out' });
    }
};

export { registerUser, verifyEmail, loginUser, logoutUser };