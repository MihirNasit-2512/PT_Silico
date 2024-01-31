import { STATUS } from '../../helper/constant.js';
import * as UtilService from '../../services/utilServices.js';
import * as AuthService from '../../services/authServices.js';
import * as CommonService from '../../services/commonServices.js';
import User from '../../models/user.js';
import joi from '../../helper/joi.js';
import message from '../../helper/message.js';
import * as Cipher from '../../services/cipherService.js';

export const signUp = async (req, res) => {
  try {
    const params = req.body;

    const fields = ['email', 'password'];

    await UtilService.checkRequiredParams(fields, params);

    const joiValid = UtilService.validateSchema(joi.isEmail, params.email);
    if (joiValid.error) {
      throw joiValid.error.details[0];
    }
    const record = await AuthService.registerService(params);
    if (record?._id) {
      const response = await CommonService.successResponse(record);
      return res.status(201).send(response);
    }
  } catch (err) {
    return res.status(422).send(err);
  }
};

export const signIn = async (req, res) => {
  try {
    const params = req.body;
    const fields = ['email', 'password'];

    await UtilService.checkRequiredParams(fields, params);

    const joiValid = UtilService.validateSchema(joi.isEmail, params.email);
    if (joiValid.error) {
      throw message.ENTER_VALID_EMAIL;
    }
    const filter = {
      email: params.email.toLowerCase(),
      status: STATUS.ACTIVE,
    };

    let user = await User.findOne(filter);
    if (!user || !user?._id) {
      throw message.USER_NOT_FOUND;
    }
    const isMatch = await Cipher.compareHash(params.password, user.password);

    if (!isMatch) {
      throw message.PASSWORD_NOT_MATCH;
    }
    user = JSON.parse(JSON.stringify(user));
    const token = await Cipher.createToken({
      id: user._id,
      type: user.type,
      status: user.status,
    });
    user.token = token;
    let response = CommonService.successResponse(user.token);
    return res
      .status(200)
      .send({ ...response, msg: message.SIGNIN_SUCCESSFUL.message });
  } catch (err) {
    return res.status(422).send(err);
  }
};
