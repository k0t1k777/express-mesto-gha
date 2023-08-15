// const { HTTP_STATUS_NOT_FOUND } = require('http2').constants;

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    // this.statusCode = HTTP_STATUS_NOT_FOUND;
  }
}

module.exports = NotFoundError;
