import mongoose, { Document, Schema } from 'mongoose';

interface IEvent extends Document {
    sellerId: mongoose.Schema.Types.ObjectId;
    sellerName: string;
    image: String | Buffer;
    name: string;
    description: string;
    eventDate: Date;
    startTime: string;
    endTime: string;
    location?: string;
    eventLink?: string;
    eventType?: 'offline' | 'online';
    category: 'workshop' | 'seminar' | 'concert' | 'tournament';
    protection: boolean;
    price: number;
    ticketStock: number;
    isConfirm: 'awaiting' | 'accepted' | 'rejected';
}

const EventSchema: Schema = new Schema({
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
    sellerName: { type: String, required: true },
    image: { type: String, Buffer },
    name: { type: String, required: true },
    description: { type: String, required: true },
    eventDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    location: { type: String },
    eventLink: { type: String },
    eventType: { 
        type: String, 
        enum: ['offline', 'online'], 
    },
    category: { 
        type: String, 
        enum: ['workshop', 'seminar', 'concert', 'tournament'], 
        required: true 
    },
    protection: { type: Boolean, default: false },
    price: { type: Number, required: true },
    ticketStock: { type: Number, required: true },
    isConfirm: { 
        type: String, 
        enum: ['awaiting', 'accepted', 'rejected'], 
        default: 'awaiting' 
    }
}, { collection: 'dataevent' });

// Menambahkan middleware untuk validasi conditional fields
EventSchema.pre('validate', function(next) {
    if (this.category === 'concert') {
        this.eventType = 'offline';
        if (!this.location) {
            this.invalidate('location', 'Location is required for concerts');
        }
    } else {
        if (this.eventType === 'offline' && !this.location) {
            this.invalidate('location', 'Location is required for offline events');
        } else if (this.eventType === 'online' && !this.eventLink) {
            this.invalidate('eventLink', 'Event link is required for online events');
        }
    }
    next();
});

const Event = mongoose.model<IEvent>('Event', EventSchema);

export default Event;
export {IEvent};