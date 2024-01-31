import { connect } from 'mongoose';
import { STATUS } from '../helper/constant.js';
import Stats from '../models/stat.js';
import { syncDefault } from '../controller/user/statController.js';

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log(`⏳️[database] mongodb is Connected`);
    const isStats = await Stats.find({ status: STATUS.ACTIVE });
    if (isStats.length == 0) {
      await syncDefault();
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
