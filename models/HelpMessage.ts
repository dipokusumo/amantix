import mongoose, { Document, Schema } from 'mongoose';

interface IMessage extends Document {
    name: string;
    email: string;
    message: string;
    createdAt: Date;
}

const messageSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: function (v: string) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Validasi format email
            },
            message: (props: any) => `${props.value} is not a valid email!`
        }
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { collection: 'datapesanbantuan' });

const Message = mongoose.model<IMessage>('Message', messageSchema);

export default Message;
export { IMessage };