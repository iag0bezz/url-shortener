import { HttpError } from '@shared/errors/HttpError';

export class CreateUrlError extends HttpError {
  constructor(message: string) {
    super(message);
  }
}
