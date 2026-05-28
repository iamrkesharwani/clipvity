import mongoose from 'mongoose';

export const connectDb = async () => {
  try {
    const uri = process.env['MONGODB_URI'];
    const dbName = process.env['DB_NAME'];

    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(uri, {
      dbName: dbName || 'clipvity',
    });

    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};
