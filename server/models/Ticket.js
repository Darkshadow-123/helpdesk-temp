import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  ticketNumber: { type: String, unique: true },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: String,
    initials: { type: String, required: true },
    color: String,
    memberSince: String
  },
  subject: { type: String, required: true },
  status: { type: String, enum: ['open', 'pending', 'solved'], default: 'open' },
  priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
  channel: { type: String, default: 'Email' },
  assigneeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags: [String]
}, { timestamps: { createdAt: true, updatedAt: true } });

ticketSchema.pre('save', async function(next) {
  if (!this.ticketNumber) {
    const count = await mongoose.model('Ticket').countDocuments();
    this.ticketNumber = `TKT-${String(count + 1).padStart(3, '0')}`;
  }
  next();
});

ticketSchema.pre('validate', async function(next) {
  if (!this.ticketNumber) {
    const count = await mongoose.model('Ticket').countDocuments();
    this.ticketNumber = `TKT-${String(count + 1).padStart(3, '0')}`;
  }
  next();
});

export default mongoose.model('Ticket', ticketSchema);
