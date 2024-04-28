export class AppError extends Error {
  constructor(statusCode, middlewareName, errorMessage) {
    super();
    this.statusCode = statusCode;
    this.middlewareName = middlewareName;
    this.message = `${this.middlewareName}:${errorMessage}`;
  }
}
