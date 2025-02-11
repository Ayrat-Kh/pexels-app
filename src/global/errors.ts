export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export class UnknownError extends Error {
  constructor(message?: string | undefined) {
    super(message);
  }
}
