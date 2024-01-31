import { model, Schema } from 'mongoose';
import { STATUS } from '../helper/constant.js';

const projectSchema = new Schema(
  {
    title: String,
    description: String,
    createdBy: String,
    status: { type: Number, default: STATUS.ACTIVE },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Project = model('project', projectSchema);

export default Project;
