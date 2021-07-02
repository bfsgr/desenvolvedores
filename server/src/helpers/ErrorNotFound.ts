export class ErrorNotFound extends Error {
  constructor(details: Record<string, string[]>) {
    super();

    Object.setPrototypeOf(this, ErrorNotFound.prototype);
  }
}
