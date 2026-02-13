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
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

if (isProduction) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
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
