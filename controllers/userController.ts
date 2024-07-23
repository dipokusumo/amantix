import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import Token from '../models/Token';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

        // Save user to database
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
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

const loginUser = async (req: Request, res: Response) => {
    const { emailOrUsername, password } = req.body;
    const user = await User.findOne({ email: emailOrUsername }).exec(); // Cari pengguna berdasarkan email atau username

    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: '1h' } // Token berakhir dalam 1 jam
    );

    // Simpan token di database
    const newToken = new Token({
        token,
        userId: user._id,
        expiresAt: new Date(Date.now() + 3600000) // Token berakhir dalam 1 jam
    });

    await newToken.save();

    res.json({ token });
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

export { registerUser, loginUser, logoutUser };