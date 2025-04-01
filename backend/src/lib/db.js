import mongoose from 'mongoose';

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to the database');
    } catch {
        console.error('Failed to connect to the database');
    }
}