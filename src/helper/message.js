export default {
  REQUIRED_FIELD_MISSING: {
    code: 422,
    message: 'Required field missing.',
    success: false,
  },
  EMAIL_ALREADY_REGISTERED: {
    code: 422,
    message: 'Email is already registered.',
    success: false,
  },
  ENTER_VALID_EMAIL: {
    code: 422,
    message: 'Enter valid email.',
    success: false,
  },
  SIGNIN_SUCCESSFUL: {
    code: 200,
    message: 'Signin successfully.',
    success: true,
  },
  PROJECT_NOT_FOUND: {
    code: 404,
    message: 'Project not found',
    success: false,
  },
  STAT_NOT_FOUND: {
    code: 404,
    message: 'Stat not found',
    success: false,
  },
  STAT_SYNCED: {
    code: 200,
    message: 'Stat synced successfully.',
    success: true,
  },
  BAD_REQUEST: {
    code: 422,
    message: 'The request cannot be fulfilled due to bad syntax',
    success: false,
  },
  PROJECT_ALREADY_EXIST: {
    code: 422,
    message: 'Project already exists.',
    success: false,
  },
  TICKET_ALREADY_EXIST: {
    code: 422,
    message: 'Ticket already exists.',
    success: false,
  },
  STAT_ALREADY_EXIST: {
    code: 422,
    message: 'Stat already exists.',
    success: false,
  },
  STAT_DELETED: {
    code: 200,
    message: 'Stat deleted successfully.',
    success: true,
  },
  STAT_NOT_DELETED: {
    code: 422,
    message: 'Stat not deleted.',
    success: false,
  },
  ASSIGNEE_NOT_FOUND: {
    code: 404,
    message: 'Assignee not found.',
    success: false,
  },
  USER_NOT_FOUND: {
    code: 404,
    message: 'User with specified credentials is not found',
    success: false,
  },
  UNAUTHORIZED: {
    code: 422,
    message: 'Missing or invalid authentication token',
    success: false,
  },
  USER_NOT_ACTIVE: {
    code: 422,
    message: 'Your account is deactivated.',
    success: false,
  },
};
