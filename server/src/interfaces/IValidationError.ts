export interface IValidationError {
  property: string;
  constraints?: Record<string, string>;
}
