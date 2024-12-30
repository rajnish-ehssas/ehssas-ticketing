// import mongoose, { disconnect } from 'mongoose';
import { DB_NAME, MONGODB_URI } from '@/env';
import mongoose from 'mongoose';

if (!MONGODB_URI || !DB_NAME) {
  throw new Error('Please define MONGODB_URI and DB_NAME in your environment variables');
}
let isConnected: boolean = false;
export const connectToDatabase = async () => {
  if (isConnected) {
    console.log('=> MongoDB is already connected');
    return;
  }
  // // if we want to change to database Name from .env  Disconnect from MongoDB after operations 
  // await disconnect();
  try {
    console.log('=> MongoDB connecting...');
    await mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME,
    });
    isConnected = true;
    console.log('=> MongoDB connected successfully');
  } catch (error) {
    console.error('=> MongoDB connection failed:', error);
    throw error;
  }
};

