// const { HTTP_STATUS_BAD_REQUEST } = require('http2').constants;

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    // this.statusCode = HTTP_STATUS_BAD_REQUEST;
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
