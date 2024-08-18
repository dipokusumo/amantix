import mongoose, { Document, Schema } from 'mongoose';

interface ISeller extends Document {
    role: 'seller';
    email: string;
    name: string;
    phone: string;
    universitas: string;
}

const sellerSchema: Schema = new Schema({
    role: {
        type: String,
        default: 'seller',
        enum: ['seller'],
    },
    email: {
        type: String,
        required: [true],
    },
    name: {
        type: String,
        required: [true],
    },
    phone: {
        type: String,
    },
    universitas: {
        type: String,
    },
}, { collection: 'dataseller' });

const Seller = mongoose.model<ISeller>('Seller', sellerSchema);

export default Seller;
export { ISeller };