import Joi from 'joi';

export default {
  isEmail: Joi.string().email().required(),
};
