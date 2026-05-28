import 'dotenv/config';
import { createServer } from 'node:http';
import { app } from './app.js';
import { connectDb } from './config/db.js';

const port = Number(process.env['PORT']) || 5000;
const httpServer = createServer(app);

const startServer = async () => {
  try {
    await connectDb();
    httpServer.listen(port, '0.0.0.0', () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to initialize app:', error);
    process.exit(1);
  }
};

startServer();
