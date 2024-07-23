import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Token from '../models/Token';

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
            };
        }
    }
}

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

        req.user = { userId: (decoded as any).userId };
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

export default authenticateToken;