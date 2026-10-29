import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || true }));
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/enquiries', enquiryRoutes);

app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

export default app;
