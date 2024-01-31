import * as Cipher from '../services/cipherService.js';
import message from '../helper/message.js';
import { TOKEN } from '../helper/constant.js';
import * as CommonService from '../services/commonServices.js';

const clientAuthenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const user = await commonValidation(authHeader);
    req.user = user;

    next();
  } catch (error) {
    console.log('authToken :: error-message ::', error);
    return res.status(401).send(error);
  }
};

const commonValidation = async (authToken) => {
  if (!authToken) {
    throw message.UNAUTHORIZED;
  }

  const authData = await Cipher.decodeToken(authToken, TOKEN.SECRET_KEY);
  const user = await CommonService.checkUserInfo(authData);

  return user;
};

export { clientAuthenticate };
