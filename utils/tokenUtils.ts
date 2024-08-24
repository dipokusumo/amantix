import jwt from 'jsonwebtoken';

interface TokenPayload {
    Id: string;
    role: 'user' | 'seller' | 'admin';
}

const generateToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });
};

export { generateToken };
