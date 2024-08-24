import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import Ticket from '../models/Ticket';
import User from '../models/User';
import Event from '../models/Event';
import Seller from '../models/Seller';
import { generateTransactionCode } from '../utils/transactionCodeUtils';

export const createTransaction = async (req: Request, res: Response): Promise<void> => {
    const { eventId, sellerId, quantity, ticketsData } = req.body;
    const userId = req.user?.Id;

    try {
        const user = await User.findById(userId);
        const event = await Event.findById(eventId);
        const seller = await Seller.findById(sellerId);

        if (!user) {
            res.status(404).json({ message: 'You have to login to buy' });
            return;
        }

        if (!event || !seller) {
            res.status(400).json({ message: 'Invalid event or seller' });
            return;
        }

        if (event.isConfirm !== 'accepted') {
            res.status(400).json({ message: 'harus nya lo gabisa liat tiket ini si' });
            return;
        }

        if (event.ticketStock < quantity) {
            res.status(400).json({ message: 'Not enough tickets available' });
            return;
        }

        const tickets = [];
        for (let i = 0; i < quantity; i++) {
            const ticketData = ticketsData[i];

            const transactionCode = generateTransactionCode(event.name, seller.name); // Menggunakan fungsi

            const ticket = new Ticket({
                ...ticketData,
                transactionCode,
                eventId,
            });

            await ticket.validate();

            tickets.push(ticket);
        }

        const eventName = `${event.name} by ${event.sellerName}`;

        const totalAmount = event.price * quantity;

        const transaction = new Transaction({
            userId,
            eventId,
            eventName,
            imageEvent: event.image,
            sellerId,
            quantity,
            tickets,
            totalAmount,
            timebuying: new Date(),
        });

        event.ticketStock -= quantity;

        await transaction.save(); // Simpan transaksi
        await event.save(); // Simpan perubahan stok tiket

        await Ticket.insertMany(tickets); // Simpan semua tiket sekaligus

        res.status(201).json({ message: 'Transaction created successfully', transaction });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create transaction', error });
    }
};