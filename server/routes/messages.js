import express from 'express';
import Message from '../models/MessageModel.js';
import Ticket from '../models/Ticket.js';
import User from '../models/User.js';
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
    let { ticketId, text, isPrivate } = req.body;
    
    console.log('=== Message request ===');
    console.log('Body:', req.body);
    console.log('isPrivate:', isPrivate, 'type:', typeof isPrivate);
    console.log('text:', text);
    
    if (!ticketId || !text) {
      return res.status(400).json({ error: 'ticketId and text are required' });
    }
    
    if (typeof isPrivate === 'string') {
      isPrivate = isPrivate === 'true';
    }
    isPrivate = Boolean(isPrivate);
    
    console.log('Processed isPrivate:', isPrivate);

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    const user = await User.findById(req.user.id);
    
    const message = new Message({
      ticketId,
      senderId: user._id,
      senderType: 'agent',
      senderName: user.name,
      senderInitials: user.initials || user.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U',
      senderColor: user.color || '#6366F1',
      text,
      isPrivate: Boolean(isPrivate)
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
