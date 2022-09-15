class Error {
  constructor(message) {
    (this.status = "error"), (this.message = message);
  }
}

module.exports = { Error };
