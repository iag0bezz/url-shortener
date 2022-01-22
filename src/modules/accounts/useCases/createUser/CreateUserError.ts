import { HttpError } from '@shared/errors/HttpError';

export class CreateUserError extends HttpError {
  constructor(message: string) {
    super(message);
  }
}
