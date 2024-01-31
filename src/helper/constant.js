const USER = {
  TYPE: {
    ADMIN: 1,
    USER: 2,
  },
};

const STATUS = {
  ACTIVE: 1,
  DEACTIVE: 2,
  DELETED: 3,
};
const DEFAULT_TICKET_STATUS = {
  TO_DO: 1,
  IN_PROGRESS: 2,
  VERIFED: 3,
  DONE: 4,
};

const TOKEN = {
  ALGORITHM: 'HS256',
  EXPIRES_IN: '30m',
  SECRET_KEY: process.env.JWT_SECRET_KEY,
};

const SALT_ROUNDS = 10;

export { USER, SALT_ROUNDS, TOKEN, STATUS, DEFAULT_TICKET_STATUS };
