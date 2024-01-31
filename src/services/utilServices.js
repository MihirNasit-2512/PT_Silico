import message from '../helper/message.js';
import moment from 'moment';

export const checkRequiredParams = (fields, params) => {
  const errorFields = [];
  for (const field of fields) {
    if (
      !params ||
      (typeof params[field] !== 'boolean' &&
        params[field] !== 0 &&
        !params[field])
    ) {
      errorFields.push(field);
    }
  }
  if (errorFields.length !== 0) {
    let response = message.REQUIRED_FIELD_MISSING;
    response = {
      ...response,
      requiredFields: errorFields,
    };
    throw response;
  }
};

export const validateSchema = (schema, body) => {
  return schema.validate(body);
};
