import { HttpError } from '@shared/errors/HttpError';

export class AuthenticateUserError extends HttpError {
  constructor(message: string) {
    super(message);
  }
}
