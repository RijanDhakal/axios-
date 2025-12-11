interface ErrorPayload {
  statusCode: number;
  message: string;
  error: string;
  path?: string;
}

export class HttpError extends Error {
  statusCode: number;
  error: string;
  path: string | undefined;
  timestamp: string;
  constructor({ statusCode, error, message, path }: ErrorPayload) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
    this.path = path;
    this.timestamp = new Date().toISOString();
  }
}
