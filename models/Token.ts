import mongoose, { Document, Schema } from 'mongoose';

interface IToken extends Document {
    token: string;
    userId: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    expiresAt: Date;
}

const TokenSchema: Schema = new Schema({
    token: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true }
}, { collection: 'userjwt' });

const Token = mongoose.model<IToken>('Token', TokenSchema);

export default Token;