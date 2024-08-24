import mongoose, { Schema, Document } from 'mongoose';
import Event from './Event';

interface ITicket extends Document {
    firstName?: string;
    lastName?: string;
    teamName?: string; // Untuk tournament
    phoneNumber: string;
    email: string;
    university?: string; // Untuk seminar dan workshop
    homeAddress?: string; // Untuk concert dan tournament
    transactionCode: string;
    eventId: mongoose.Schema.Types.ObjectId;
}

const TicketSchema: Schema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    teamName: { type: String },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    university: { type: String },
    homeAddress: { type: String },
    transactionCode: { type: String, required: true, unique: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
}, { collection: 'datapertiket' });

TicketSchema.pre('validate', async function (next) {
    try {
        const ticket = this as unknown as ITicket; // Casting to `unknown` first, then to `ITicket`

        // Ambil event dari ID yang ada di tiket
        const event = await Event.findById(ticket.eventId).select('category');

        if (!event) {
            return next(new Error('Event not found'));
        }

        const eventCategory = event.category;

        if (eventCategory === 'seminar') {
            if (!this.firstName) {
                this.invalidate('firstName', 'First name is required for seminars');
            }
            if (!this.lastName) {
                this.invalidate('lastName', 'Last name is required for seminars');
            }
            if (!this.university) {
                this.invalidate('university', 'University is required for seminars');
            }
        } else if (eventCategory === 'workshop') {
            if (!this.firstName) {
                this.invalidate('firstName', 'First name is required for workshops');
            }
            if (!this.lastName) {
                this.invalidate('lastName', 'Last name is required for workshops');
            }
            if (!this.university) {
                this.invalidate('university', 'University is required for workshops');
            }
        } else if (eventCategory === 'concert') {
            if (!this.firstName) {
                this.invalidate('firstName', 'First name is required for concerts');
            }
            if (!this.lastName) {
                this.invalidate('lastName', 'Last name is required for concerts');
            }
            if (!this.homeAddress) {
                this.invalidate('homeAddress', 'Home address is required for concerts');
            }
        } else if (eventCategory === 'tournament') {
            if (!this.teamName) {
                this.invalidate('teamName', 'Team name is required for tournaments');
            }
            if (!this.homeAddress) {
                this.invalidate('homeAddress', 'Home address is required for tournaments');
            }
        }

        next();
    } catch (err) {
        next(err as Error);
    }
});

const Ticket = mongoose.model<ITicket>('Ticket', TicketSchema);

export default Ticket;
export { TicketSchema, ITicket };