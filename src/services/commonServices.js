import message from '../helper/message.js';
import { STATUS } from '../helper/constant.js';
import User from '../models/user.js';

const successResponse = (data = {}) => {
  const response = {
    code: 200,
    success: true,
    data: data,
  };

  return response;
};

const checkUserInfo = async (data) => {
  try {
    const filter = { status: { $nin: [STATUS.DELETED] } };
    if (data && data.id) {
      filter['_id'] = data.id;
    } else if (data && data.email) {
      filter['email'] = data.email;
    }
    const record = await User.findOne(filter);
    if (!record) {
      throw message.USER_NOT_FOUND;
    }
    if (record.status == STATUS.DEACTIVE) {
      throw message.USER_NOT_ACTIVE;
    }
    return record;
  } catch (err) {
    throw err;
  }
};

export { successResponse, checkUserInfo };
