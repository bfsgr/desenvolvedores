export class ErrorNotFound extends Error {
  constructor(message?: string) {
    super(message);

    Object.setPrototypeOf(this, ErrorNotFound.prototype);
  }
}
