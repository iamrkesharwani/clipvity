import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';

const corsOrigin = process.env['CORS_ORIGIN'] || 'http://localhost:5173';

const app = express();

app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json());
app.use(cookieParser())

app.use('/api/auth', authRoutes);

export { app, corsOrigin };
