import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  senderType: { type: String, enum: ['customer', 'agent'], required: true },
  senderName: { type: String, required: true },
  senderInitials: { type: String, required: true },
  senderColor: { type: String },
  text: { type: String, required: true },
  isPrivate: { type: Boolean, default: false }
}, { timestamps: { createdAt: true, updatedAt: false } });

export default mongoose.model('Message', messageSchema);
