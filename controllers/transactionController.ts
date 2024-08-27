import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import Ticket from '../models/Ticket';
import User from '../models/User';
import Event from '../models/Event';
import Seller from '../models/Seller';
import { generateTransactionCode } from '../utils/transactionCodeUtils';
import midtransClient from 'midtrans-client'; // Import Midtrans SDK

// Initialize Snap API
const snap = new midtransClient.Snap({
    isProduction: false, // Ubah ke true jika dalam production
    serverKey: process.env.MIDTRANS_sERVER,
    clientKey: process.env.MIDTRANS_CLIENT,
});

const createTransaction = async (req: Request, res: Response): Promise<void> => {
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
            res.status(400).json({ message: 'You are not allowed to see this ticket' });
            return;
        }

        if (event.ticketStock < quantity) {
            res.status(400).json({ message: 'Not enough tickets available' });
            return;
        }

        const tickets = [];
        for (let i = 0; i < quantity; i++) {
            const ticketData = ticketsData[i];

            const transactionCode = generateTransactionCode(event.name, seller.name);

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

        await transaction.save();
        await event.save();

        await Ticket.insertMany(tickets);

        const orderId = (transaction._id as unknown as string).toString();

        // Create a payment transaction using Midtrans Snap API
        const paymentPayload = {
            transaction_details: {
                order_id: orderId, // Use the transaction ID as the order_id
                gross_amount: totalAmount,
            },
            credit_card: {
                secure: true,
            },
            // customer_details: {
            //     first_name: user.firstName,
            //     last_name: user.lastName,
            //     email: user.email,
            //     phone: user.phoneNumber,
            // },
            item_details: tickets.map((ticket) => ({
                id: `${ticket.transactionCode}`,
                price: event.price,
                quantity: 1,
                name: `${eventName} Ticket`,
            })),
        };

        const midtransTransaction = await snap.createTransaction(paymentPayload);

        res.status(201).json({
            message: 'Transaction created successfully',
            transaction,
            paymentUrl: midtransTransaction.redirect_url,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create transaction', error });
    }
};

export { createTransaction };