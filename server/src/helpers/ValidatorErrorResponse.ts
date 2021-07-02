export class ValidatorErrorResponse extends Error {
  details: Record<string, string[]> = {};

  constructor(details: Record<string, string[]>) {
    super();
    this.details = details;

    Object.setPrototypeOf(this, ValidatorErrorResponse.prototype);
  }
}
