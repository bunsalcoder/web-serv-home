const ERROR_CODE_TO_MESSAGE = {
  10000: "Server is maintence",
};

class Response {
  constructor(res) {
    this.response = res;
  }

  setStatusCode(code) {
    this.code = code;
    return this;
  }

  setCustomCode(code) {
    this.customCode = code;
    return this;
  }

  setMessage(msg) {
    this.message = msg;
    return this;
  }

  setResponse(data) {
    this.data = data;
    return this;
  }

  send() {
    this.response.status(this.code || 200).send({
      code: this.customCode,
      message: this.message || ERROR_CODE_TO_MESSAGE[this.customCode],
      result: this.data,
    });
  }
}

module.exports = Response;
