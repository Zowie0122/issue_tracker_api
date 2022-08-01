const { ServerGenericError } = require("../utils/errors");

const errorHandler = (err, req, res, next) => {
  if (err) {
    // if the error is not specified, then show the common error
    const genericError = new ServerGenericError(err);
    res.status(err.status ?? genericError.status).json({
      code: err.code ?? genericError.code,
      err: err.msg ?? genericError.msg,
    });
  }
};

module.exports = errorHandler;
