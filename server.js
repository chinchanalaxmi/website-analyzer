import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import reportRoutes from './routes/api/reports.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for http://localhost:5173
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Routes
app.use('/api/reports', reportRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ msg: 'Server is running', dbStatus: 'in-memory' });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ msg: 'Test endpoint working' });
});

app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Server started on port ${PORT}`);
});