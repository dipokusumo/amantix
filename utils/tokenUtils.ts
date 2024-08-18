import jwt from 'jsonwebtoken';

// Define a type for the payload
interface TokenPayload {
    Id: string;
    role: 'user' | 'seller' | 'admin';
}

const generateToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });
};

export { generateToken };
