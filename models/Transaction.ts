import mongoose, { Schema, Document } from 'mongoose';
import { TicketSchema, ITicket } from './Ticket';

// Model untuk transaksi
interface ITransaction extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    eventId: mongoose.Schema.Types.ObjectId;
    sellerId: mongoose.Schema.Types.ObjectId;
    quantity: number;
    tickets: ITicket[];
    totalAmount: number;
    timebuying: Date;
}

// Schema untuk transaksi
const TransactionSchema: Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
    quantity: { type: Number, required: true },
    tickets: { type: [TicketSchema], required: true }, // Perhatikan perubahan di sini
    totalAmount: { type: Number, required: true },
    timebuying: { type: Date, default: Date.now },
}, { collection: 'datatransaksi' });

const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);

export default Transaction;
export { ITransaction };