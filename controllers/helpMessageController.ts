import { Request, Response } from 'express';
import Message from '../models/HelpMessage';
import transporter from '../config/mailer';
import ExcelJS from 'exceljs'; 

const saveMessage = async (req: Request, res: Response): Promise<void> => {
    const { name, email, message } = req.body;

    try {
        const newMessage = new Message({
            name,
            email,
            message,
        });

        await newMessage.save();

        // Send confirmation email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Confirmation of Message Receipt',
            html: `<p>Dear ${name},</p><p>Thank you for contacting us. We have received your message and will get back to you shortly.</p><p>Best regards,</p><p>AmanTix</p>`,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'Message received and email confirmation sent.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err });
    }
};

const getMessages = async (req: Request, res: Response): Promise<void> => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const messages = await Message.find()
            .sort({ createdAt: -1 })
            .skip((+page - 1) * +limit)
            .limit(+limit);

        const totalMessages = await Message.countDocuments();
        const totalPages = Math.ceil(totalMessages / +limit);

        res.json({ page: +page, totalPages, totalMessages, messages });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const downloadMessageExcel = async (req: Request, res: Response): Promise<void> => {
    try {
        const messages = await Message.find().sort({ createdAt: 1 });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Messages');

        worksheet.columns = [
            { header: 'ID', key: '_id', width: 25 },
            { header: 'Name', key: 'name', width: 20 },
            { header: 'Email', key: 'email', width: 32 },
            { header: 'Message', key: 'message', width: 70 },
            { header: 'Created At', key: 'createdAt', width: 14 },
        ];

        messages.forEach(message => {
            worksheet.addRow(message);
        });

        // Set response header
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=Data Help Message AmanTix.xlsx');

        // Write to response
        await workbook.xlsx.write(res);
        res.status(200).end();
    } catch (error) {
        console.error('Error generating Excel file', error);
        res.status(500).json({ message: 'Failed to generate Excel file' });
    }
};

export { saveMessage, getMessages, downloadMessageExcel };