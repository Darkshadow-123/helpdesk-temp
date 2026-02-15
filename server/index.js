import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import ticketRoutes from './routes/tickets.js';
import messageRoutes from './routes/messages.js';
import { seedDatabase } from './data/seed.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

const isProduction = process.env.NODE_ENV === 'production';
const distPath = path.join(__dirname, '../client/dist');

app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/messages', messageRoutes);
app.get('/api/debug/status', (req, res) => {
  res.json({ 
    isProduction, 
    nodeEnv: process.env.NODE_ENV,
    mongoUri: MONGODB_URI ? 'set' : 'not set'
  });
});

app.all('/api/debug/seed', async (req, res) => {
  if (!MONGODB_URI) {
    return res.status(500).json({ error: 'No database connection' });
  }
  try {
    await seedDatabase();
    res.json({ message: 'Database seeded' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.all('/api/debug/users', async (req, res) => {
  if (!MONGODB_URI) {
    return res.status(500).json({ error: 'No database connection' });
  }
  try {
    const User = (await import('./models/User.js')).default;
    const count = await User.countDocuments();
    const users = await User.find().select('name email role');
    res.json({ count, users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.all('/api/debug/create-demo', async (req, res) => {
  if (!MONGODB_URI) {
    return res.status(500).json({ error: 'No database connection' });
  }
  try {
    const User = (await import('./models/User.js')).default;
    const bcrypt = (await import('bcryptjs')).default;
    
    const demoUsers = [
      { name: 'Sarah Chen', email: 'sarah@capacity.com', initials: 'SC', color: '#6366F1' },
      { name: 'Mike Johnson', email: 'mike@capacity.com', initials: 'MJ', color: '#10B981' },
      { name: 'Emma Wilson', email: 'emma@capacity.com', initials: 'EW', color: '#F59E0B' }
    ];
    
    const hashedPassword = await bcrypt.hash('password123', 10);
    const results = [];
    for (const demoUser of demoUsers) {
      let user = await User.findOne({ email: demoUser.email });
      if (user) {
        user.password = hashedPassword;
        await user.save();
        results.push({ email: demoUser.email, action: 'reset' });
      } else {
        user = new User({
          ...demoUser,
          password: hashedPassword,
          role: 'agent'
        });
        await user.save();
        results.push({ email: demoUser.email, action: 'created' });
      }
    }
    
    res.json({ message: 'Done', results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

if (isProduction) {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

const connectDB = async () => {
  if (!MONGODB_URI) {
    console.log('MONGODB_URI not set, skipping database connection');
    if (isProduction) {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} (no DB)`);
      });
    }
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    await seedDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
    if (isProduction) {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} (DB connection failed)`);
      });
    }
  }
};

connectDB();

export default app;
