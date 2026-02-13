import express from 'express';
import Message from '../models/MessageModel.js';
import Ticket from '../models/Ticket.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/ticket/:ticketId', auth, async (req, res) => {
  try {
    const { isPrivate } = req.query;
    const filter = { ticketId: req.params.ticketId };
    
    if (isPrivate !== undefined) {
      filter.isPrivate = isPrivate === 'true';
    }

    const messages = await Message.find(filter).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { ticketId, text, isPrivate } = req.body;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    const message = new Message({
      ticketId,
      senderId: req.user.id,
      senderType: 'agent',
      senderName: req.user.name,
      senderInitials: req.user.initials,
      senderColor: req.user.color,
      text,
      isPrivate: isPrivate || false
    });

    await message.save();

    await Ticket.findByIdAndUpdate(ticketId, { updatedAt: new Date() });

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/counts/:ticketId', auth, async (req, res) => {
  try {
    const publicCount = await Message.countDocuments({ ticketId: req.params.ticketId, isPrivate: false });
    const privateCount = await Message.countDocuments({ ticketId: req.params.ticketId, isPrivate: true });
    res.json({ public: publicCount, private: privateCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
