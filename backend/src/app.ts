import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import {
  authLimiter,
  generalLimiter,
} from './middleware/rateLimit.middleware.js';
import authRoutes from './routes/auth.routes.js';
import { appError } from './utils/appError.js';

const corsOrigin = process.env['CORS_ORIGIN'] || 'http://localhost:5173';

const app = express();

app.use(helmet());
app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(generalLimiter);

app.use('/api/auth', authLimiter, authRoutes);

app.use(appError);

export { app, corsOrigin };
