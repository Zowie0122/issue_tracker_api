// common error handling
class BadRequestGenericError extends Error {
  constructor(message) {
    super(message);
    this.msg = "Bad Request";
    this.status = 400;
    this.code = 1000;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.msg = "Unauthorized";
    this.status = 401;
    this.code = 1001;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.msg = "Forbidden";
    this.status = 403;
    this.code = 1002;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.msg = "Not Found";
    this.status = 404;
    this.code = 1003;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.msg = "Validation Error";
    this.status = 400;
    this.code = 1004;
  }
}

class LogoutError extends Error {
  constructor(message) {
    super(message);
    this.msg = "Logout Error";
    this.status = 400;
    this.code = 1005;
  }
}

/* For all the server or database errors, only show the generic error message for safety, 
frontend will use `code` property to define the specific error cause. */
class ServerGenericError extends Error {
  constructor(message) {
    super(message);
    this.msg = "Server Error";
    this.status = 500;
    this.code = 2000;
  }
}

class DBError extends Error {
  constructor(message) {
    super(message);
    this.msg = "Server Error";
    this.status = 500;
    this.code = 2001;
  }
}

class DBNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.msg = "Server Error";
    this.status = 500;
    this.code = 2002;
  }
}

module.exports = {
  BadRequestGenericError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
  LogoutError,
  ServerGenericError,
  DBError,
  DBNotFoundError,
};
