/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
import { STATUS } from '../helper/constant.js';
import message from '../helper/message.js';
import User from '../models/user.js';
import * as Cipher from './cipherService.js';

export const registerService = async (params) => {
  try {
    const filter = {
      email: params.email,
      status: { $nin: [STATUS.DELETED] },
    };

    const record = await User.findOne(filter);
    if (record?.email) {
      throw message.EMAIL_ALREADY_REGISTERED;
    }
    params.email = params.email.toLowerCase();
    const hasEncyptPassword = await Cipher.generateHash(params.password);
    params.password = hasEncyptPassword;
    let isUserCreated = await User.create(params);
    const payload = {
      id: isUserCreated?._id,
      type: isUserCreated.type,
      status: isUserCreated.status,
    };
    const token = await Cipher.createToken(payload);
    if (token) {
      isUserCreated.token = token;
    }
    return isUserCreated;
  } catch (err) {
    throw err;
  }
};
