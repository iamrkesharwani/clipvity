import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import {
  authLimiter,
  generalLimiter,
} from './middleware/rateLimit.middleware.js';

const corsOrigin = process.env['CORS_ORIGIN'] || 'http://localhost:5173';

const app = express();

app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(generalLimiter);

app.use('/api/auth', authLimiter, authRoutes);

export { app, corsOrigin };
