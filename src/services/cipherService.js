import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SALT_ROUNDS, TOKEN } from '../helper/constant.js';

export const createToken = async (payload) => {
  try {
    const option = {
      algorithm: TOKEN.ALGORITHM,
      expiresIn: TOKEN.EXPIRES_IN,
    };
    const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, option);
    return token;
  } catch (error) {
    console.log(error);
  }
};

export const decodeToken = async (authToken, authkey) => {
  const decode = jwt.verify(authToken, authkey);

  return decode;
};

export const generateHash = async (password) => {
  try {
    const salt = await bcrypt.genSaltSync(SALT_ROUNDS);
    const hash = await bcrypt.hashSync(password, salt);
    return hash;
  } catch (err) {
    throw err;
  }
};

export const compareHash = async (password, hasPassword) => {
  try {
    const comparePassword = await bcrypt.compareSync(password, hasPassword);
    return comparePassword;
  } catch (err) {
    throw err;
  }
};
