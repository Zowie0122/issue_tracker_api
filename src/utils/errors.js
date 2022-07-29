// common error handling
const ERRS = {
  badRequestGeneric: {
    code: 400,
    message: "Bad Request",
  },

  unauthorized: {
    code: 401,
    message: "Unauthorized",
  },

  forbidden: {
    code: 403,
    message: "Forbidden",
  },

  notFound: {
    code: 404,
    message: "Not Found",
  },
  
  serverErrorGeneric: {
    code: 500,
    message: "Internal Server Error",
  },

  serverErrorGeneric: {
    code: 500,
    message: "Internal Server Error",
  },
};

module.exports = ERRS;
