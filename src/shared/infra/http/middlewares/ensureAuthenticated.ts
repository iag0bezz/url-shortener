import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
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
    const { sub: user_id } = verify(token, authConfig.secret) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new HttpError('User does not exists.', 401);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new HttpError('Invalid token or expired.', 401);
  }
}
