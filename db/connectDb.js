
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.DB_URL}`);
  } catch (error) {
    process.exit(1);
  }
}


export default connectDB;