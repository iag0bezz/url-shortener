import { NextFunction, Request } from 'express';
import { verify } from 'jsonwebtoken';

import { HttpError } from '@shared/errors/HttpError';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  _response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new HttpError('You need provide token in header.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, '') as IPayload;

    next();
  } catch {
    throw new HttpError('Invalid token or expired.', 401);
  }
}
