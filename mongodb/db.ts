import dns from 'dns';
import mongoose from 'mongoose';

dns.setServers(['1.1.1.1', '8.8.8.8']);

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function connectDB(): Promise<void> {
  if (connection.isConnected) {
    console.log('Already connected to the database');
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || '', {
      dbName: 'linkedIn_clone',
    });
    connection.isConnected = db.connections[0].readyState;
    console.log('Data base connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);

    // Graceful exit in case of a connection error
    process.exit(1);
  }
}

export default connectDB;
