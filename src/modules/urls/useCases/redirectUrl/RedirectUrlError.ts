import { HttpError } from '@shared/errors/HttpError';

export class RedirectUrlError extends HttpError {
  constructor(message: string) {
    super(message);
  }
}
