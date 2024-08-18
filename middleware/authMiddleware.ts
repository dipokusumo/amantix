import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Token from '../models/Token';
import User from '../models/User';
import Seller from '../models/Seller';
import Admin from '../models/Admin';

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token is required' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
        const storedToken = await Token.findOne({ token }).exec();

        if (!storedToken || storedToken.expiresAt < new Date()) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        let user;
        if (storedToken.role === 'user') {
            user = await User.findById(storedToken.Id).exec();
        } else if (storedToken.role === 'seller') {
            user = await Seller.findById(storedToken.Id).exec();
        } else if (storedToken.role === 'admin') {
            user = await Admin.findById(storedToken.Id).exec();
        }

        if (!user) {
            return res.status(403).json({ message: 'User not found' });
        }

        req.user = { Id: (decoded as any).Id, role: storedToken.role };
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

const authorizeRole = (requiredRole: string) => (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== requiredRole) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

export { authenticateToken, authorizeRole };