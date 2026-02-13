import express from 'express';
import Ticket from '../models/Ticket.js';
import Message from '../models/MessageModel.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const { status, priority, search, assignee } = req.query;
    
    const filter = {};
    if (status && status !== 'All') filter.status = status.toLowerCase();
    if (priority) filter.priority = priority.toLowerCase();
    if (assignee) filter.assigneeId = assignee;
    if (search) {
      filter.$or = [
        { subject: { $regex: search, $options: 'i' } },
        { 'customer.name': { $regex: search, $options: 'i' } },
        { 'customer.email': { $regex: search, $options: 'i' } }
      ];
    }

    const tickets = await Ticket.find(filter)
      .populate('assigneeId', 'name initials color')
      .sort({ updatedAt: -1 });

    const ticketsWithMessageCount = await Promise.all(
      tickets.map(async (ticket) => {
        const messageCount = await Message.countDocuments({ ticketId: ticket._id });
        const lastMessage = await Message.findOne({ ticketId: ticket._id }).sort({ createdAt: -1 });
        return {
          ...ticket.toObject(),
          messageCount,
          lastMessage: lastMessage?.text || ''
        };
      })
    );

    res.json(ticketsWithMessageCount);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate('assigneeId', 'name initials color');
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { customer, subject, priority, channel, tags } = req.body;

    const initials = customer.name.split(' ').map(n => n[0]).join('').toUpperCase();
    const colors = ['#667eea', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6', '#06B6D4', '#EF4444', '#14B8A6'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    const ticket = new Ticket({
      customer: {
        name: customer.name,
        email: customer.email,
        company: customer.company || '',
        initials,
        color,
        memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      },
      subject,
      priority: priority || 'medium',
      channel: channel || 'Email',
      tags: tags || [],
      assigneeId: req.user.id
    });

    await ticket.save();

    const firstMessage = new Message({
      ticketId: ticket._id,
      senderType: 'customer',
      senderName: customer.name,
      senderInitials: initials,
      senderColor: color,
      text: subject,
      isPrivate: false
    });
    await firstMessage.save();

    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { status, priority, assigneeId, tags } = req.body;
    
    const update = {};
    if (status) update.status = status;
    if (priority) update.priority = priority;
    if (assigneeId) update.assigneeId = assigneeId;
    if (tags) update.tags = tags;

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    ).populate('assigneeId', 'name initials color');

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Message.deleteMany({ ticketId: req.params.id });
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ticket deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
