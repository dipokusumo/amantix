import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import Seller, { ISeller } from '../models/Seller';
import Admin from '../models/Admin';
import Token from '../models/Token';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import transporter from '../config/mailer';
import { generateToken } from '../utils/tokenUtils';

const addSeller = async (req: Request, res: Response): Promise<void> => {
    const { email, name, phone, universitas } = req.body;

    try {
        let seller: ISeller | null = await Seller.findOne({ email });
        if (seller) {
            res.status(400).json({ message: 'Email is already in use' });
            return;
        }

        // Check if email already exists in Seller collection
        const user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ message: 'Email is already registered as a user' });
            return;
        }

        // Check if email already exists in Admin collection
        const admin = await Admin.findOne({ email });
        if (admin) {
            res.status(400).json({ message: 'Email is already registered as an admin' });
            return;
        }

        seller = await Seller.findOne({ name });
        if (seller) {
            res.status(400).json({ message: 'Name is already in use' });
            return;
        }

        seller = await Seller.findOne({ phone });
        if (seller) {
            res.status(400).json({ message: 'Phone number is already in use' });
            return;
        }

        seller = new Seller({
            role: 'seller',
            email,
            name,
            phone,
            universitas
        });

        await seller.save();

        res.status(201).json({ message: 'Seller added successfully', seller});
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

        // Check if email already exists in Seller collection
        const seller = await Seller.findOne({ email });
        if (seller) {
            res.status(400).json({ message: 'Email is already registered as a seller' });
            return;
        }

        // Check if email already exists in Admin collection
        const admin = await Admin.findOne({ email });
        if (admin) {
            res.status(400).json({ message: 'Email is already registered as an admin' });
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
        const isPasswordValid = await bcrypt.compare(password, user.password || '');
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken({ Id: user.id, role: 'user' });

        // Save the token in the database
        const newToken = new Token({
            token,
            Id: user._id,
            role: "user",
            expiresAt: new Date(Date.now() + 3600000) // Token expires in 1 hour
        });

        await newToken.save();

        res.json({ message: 'Log in successfully', token, Id: user._id, username: user.username, image: user.image, role: user.role });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
};

const getUserProfile = async (req: Request, res: Response) => {
    const userId = req.user?.Id;

    try {
        const user = await User.findById(userId)
        .select('_id email username phone image');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const changeImageProfile = async (req: Request, res: Response) => {
    const userId = req.user?.Id;
    const imageBuffer = req.file?.buffer;
    
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (imageBuffer) {
            // Convert the image buffer to a Base64 string
            const base64Image = imageBuffer.toString('base64');

            // Include the MIME type as a prefix if needed
            const base64ImageWithMime = `data:${req.file?.mimetype};base64,${base64Image}`;

            // Save the Base64 image string to the user's profile
            user.image = base64ImageWithMime;
        }

        await user.save();
        res.status(200).json({ message: 'Profile image updated successfully', image: user.image });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const updateUserPhone = async (req: Request, res: Response) => {
    const userId = req.user?.Id;
    const { phone } = req.body;

    try {
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.phone = phone || user.phone;

        await user.save();
        res.json({ message: 'User phone number updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const changePassword = async (req: Request, res: Response): Promise<void> => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user?.Id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Check if the current password is correct
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password || '');
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Current password is incorrect' });
            return;
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        // Save the updated user information
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
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

export { addSeller, registerUser, verifyEmail, loginUser, getUserProfile, changeImageProfile, updateUserPhone, changePassword, logoutUser };