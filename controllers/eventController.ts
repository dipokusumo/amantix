import { Request, Response } from 'express';
import Event from '../models/Event';
import Seller from '../models/Seller';

const addEvent = async (req: Request, res: Response): Promise<void> => {
    const { name, description, eventDate, startTime, endTime, location, eventLink, eventType, category, protection, price, ticketStock, isConfirm} = req.body;
    const image = req.file?.buffer;
    const sellerId = req.user?.Id;

    try {
        const seller = await Seller.findById(sellerId);

        if (!seller) {
            res.status(404).json({ message: 'Seller not found' });
            return;
        }
        
        const newEvent = new Event({
            sellerId,
            sellerName: seller.name,
            image,
            name,
            description,
            eventDate,
            startTime,
            endTime,
            location,
            eventLink,
            eventType,
            category,
            protection,
            price,
            ticketStock,
            isConfirm
        });

        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error });
    }
};

const getUpcomingEvents = async (req: Request, res: Response): Promise<void> => {
    try {
        const now = new Date();

        const upcomingEvents = await Event.find({ eventDate: { $gte: now }, isConfirm: 'accepted' })
            .sort({ eventDate: 1 })
            .limit(7)
            .select('_id image name');
        res.status(200).json(upcomingEvents);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch events', error });
    }
};

const getEventsByCategory = async (req: Request, res: Response): Promise<void> => {
    const { category } = req.params;

    try {
        const now = new Date();

        const eventbycategory = await Event.find({ category, eventDate: { $gte: now }, isConfirm: 'accepted' })
            .sort({ eventDate: 1 })
            .select('_id image name'); // Mengambil nama dan eventDate (atau field lain yang diinginkan)
        res.status(200).json(eventbycategory);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch events', error });
    }
};

const searchEvent = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.query;

    try {
        const now = new Date();

        const regex = new RegExp(`\\b${name}`, 'i');

        const searchevent = await Event.find({ 
                name: { $regex: regex }, 
                eventDate: { $gte: now },
                isConfirm: 'accepted'
            })
            .sort({ eventDate: 1 })
            .select('_id image name eventDate'); // Mengambil nama dan eventDate (atau field lain yang diinginkan)

        res.status(200).json(searchevent);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch events', error });
    }
};

const getEventDetail = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        // Temukan event berdasarkan ID
        const event = await Event.findById(id);

        if (!event) {
            res.status(404).json({ message: 'Event not found' });
            return;
        }

        // Gabungkan waktu mulai dan akhir
        const eventTime = `${event.startTime} - ${event.endTime} WIB`;

        const eventName = `${event.name} by ${event.sellerName}`;

        // Respons dengan detail event
        res.status(200).json({
            eventId: event._id,
            sellerId: event.sellerId,
            eventName,
            Image: event.image,
            description: event.description,
            eventDate: event.eventDate,
            eventTime,
            location: event.eventType === 'offline' ? event.location : undefined, // hanya akan muncul jika event offline atau concert
            eventLink: event.eventType === 'online' ? event.eventLink : undefined, // Hanya muncul jika event online
            eventType: event.eventType, // Menyertakan jenis event
            category: event.category, // Menyertakan kategori event
            protection: event.protection,
            price: event.price,
            ticketStock: event.ticketStock,
            isConfirm: event.isConfirm
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch event details', error });
    }
};

// Get event counts based on isConfirm status
const getEventCountsForSeller = async (req: Request, res: Response): Promise<void> => {
    const sellerId = req.user?.Id; // Get sellerId from token

    try {
        const seller = await Seller.findById(sellerId);

        if (!seller) {
            res.status(404).json({ message: 'Seller not found' });
            return;
        }

        const awaitingCount = await Event.countDocuments({ sellerId, isConfirm: 'awaiting' });
        const acceptedCount = await Event.countDocuments({ sellerId, isConfirm: 'accepted' });
        const rejectedCount = await Event.countDocuments({ sellerId, isConfirm: 'rejected' });

        res.status(200).json({
            awaiting: awaitingCount,
            accepted: acceptedCount,
            rejected: rejectedCount,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch event counts', error });
    }
};

// Get 5 upcoming events closest to current date
const getUpcomingEventsForSeller = async (req: Request, res: Response): Promise<void> => {
    const sellerId = req.user?.Id; // Get sellerId from token
    
    try {
        const seller = await Seller.findById(sellerId);

        if (!seller) {
            res.status(404).json({ message: 'Seller not found' });
            return;
        }
        
        const now = new Date();

        const upcomingEvents = await Event.find({ 
                sellerId, 
                eventDate: { $gte: now }
            })
            .sort({ eventDate: 1 })
            .limit(5)
            .select('_id image name isConfirm');

        res.status(200).json(upcomingEvents);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch upcoming events', error });
    }
};

const getAllEventsForSeller = async (req: Request, res: Response): Promise<void> => {
    const sellerId = req.user?.Id; // Get sellerId from token

    try {
        const seller = await Seller.findById(sellerId);

        if (!seller) {
            res.status(404).json({ message: 'Seller not found' });
            return;
        }

        const allEvents = await Event.find({ sellerId })
            .sort({ eventDate: 1 })
            .select('_id image name isConfirm');

        res.status(200).json(allEvents);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch upcoming events', error });
    }
};

const confirmEvent = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { confirm } = req.body;

    try {
        // Find the event by ID and ensure it's in 'awaiting' status
        const event = await Event.findOne({ _id: id, isConfirm: 'awaiting' });

        if (!event) {
            res.status(404).json({ message: 'Event not found or already processed' });
            return;
        }

        // Update the status based on the action
        if (confirm === 'accept') {
            event.isConfirm = 'accepted';
        } else if (confirm === 'reject') {
            event.isConfirm = 'rejected';
        } else {
            res.status(400).json({ message: 'Invalid confirm update' });
            return;
        }

        await event.save();

        res.status(200).json({ message: `Event ${confirm}ed successfully` });
    } catch (error) {
        console.error(`Error during event confirmation:`, error);
        res.status(500).json({ message: `Failed to ${confirm} event`, error });
    }
};

const editEvent = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // Get the event ID from URL params
    const { name, description, eventDate, startTime, endTime, location, eventLink, eventType, category, protection, price, ticketStock } = req.body;
    const image = req.file?.buffer; // Get the updated image from the request if provided

    try {
        // Find and update the event by ID
        const event = await Event.findByIdAndUpdate( { _id: id }, {
            name,
            description,
            eventDate,
            startTime,
            endTime,
            location,
            eventLink,
            eventType,
            category,
            protection,
            price,
            ticketStock,
            image: image || undefined // Only update image if provided
        }, { new: true }); // `new: true` returns the updated document

        if (!event) {
            res.status(404).json({ message: 'Event not found' });
            return;
        }

        res.status(200).json({ message: 'Event updated successfully', event });
    } catch (error) {
        res.status(500).json({ message: 'Error updating event', error });
    }
};


// Delete an event if isConfirm is awaiting and sellerId matches
const deleteEvent = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const sellerId = req.user?.Id; // Get sellerId from token
    
    try {
        const seller = await Seller.findById(sellerId);

        if (!seller) {
            res.status(404).json({ message: 'Seller not found' });
            return;
        }

        const event = await Event.findOne({ _id: id, sellerId, isConfirm: 'awaiting' });

        // Check if event exists
        if (!event) {
            res.status(400).json({ message: 'Event not found or cannot be deleted' });
            return;
        }

        // Delete the event
        await Event.deleteOne({ _id: id, sellerId });

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.log("Error during event deletion:", error);
        res.status(500).json({ message: 'Failed to delete event', error });
    }
};

const getEventsByConfirmationStatus = async (req: Request, res: Response): Promise<void> => {
    const { isConfirm } = req.params;
    const confirmation = isConfirm || 'awaiting'; // Gunakan 'awaiting' sebagai nilai default jika isConfirm tidak ada

    try {         
        const events = await Event.find({ isConfirm: confirmation })
            .sort({ eventDate: 1 })
            .select('_id image name isConfirm'); // Mengambil id, image, dan name dari event

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch events', error });
    }
};


export { addEvent, getUpcomingEvents, getEventsByCategory, searchEvent, getEventDetail, getUpcomingEventsForSeller, getEventCountsForSeller, getAllEventsForSeller, confirmEvent, editEvent, deleteEvent, getEventsByConfirmationStatus };