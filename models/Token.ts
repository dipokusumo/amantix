import mongoose, { Document, Schema } from 'mongoose';

declare global {
    namespace Express {
        interface Request {
            user?: {
                Id: string;
                role: 'user' | 'seller' | 'admin';
                // Add other properties if needed
            };
        }
    }
}

interface IToken extends Document {
    token: string;
    Id: mongoose.Schema.Types.ObjectId;
    role: 'user' | 'seller' | 'admin'; // Add role field
    createdAt: Date;
    expiresAt: Date;
}

const TokenSchema: Schema = new Schema({
    token: { type: String, required: true },
    Id: { type: mongoose.Schema.Types.ObjectId, required: true },
    role: { 
        type: String,
        enum: ['user', 'seller', 'admin'],
        required: true
    },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
}, { collection: 'jwt' });

const Token = mongoose.model<IToken>('Token', TokenSchema);

export default Token;
export {IToken};