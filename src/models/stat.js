import { model, Schema } from 'mongoose';
import { STATUS } from '../helper/constant.js';

const statSchema = new Schema(
  {
    name: String,
    description: String,
    createdBy: String,
    status: { type: Number, default: STATUS.ACTIVE },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Stats = model('stats', statSchema);

export default Stats;
