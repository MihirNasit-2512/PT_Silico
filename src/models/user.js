import { model, Schema } from 'mongoose';
import { STATUS, USER } from '../helper/constant.js';

const userSchema = new Schema(
  {
    email: String,
    password: String,
    token: { type: String, default: '' },
    status: { type: Number, default: STATUS.ACTIVE },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = model('user', userSchema);

export default User;
