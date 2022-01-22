import express, { Request, Response } from 'express';
import 'express-async-errors';

import 'reflect-metadata';

import '@shared/container';
import { HttpError } from '@shared/errors/HttpError';
import { routes } from '@shared/infra/http/routes';
import createConnection from '@shared/infra/typeorm';

createConnection();
const app = express();

app.use(express.json());

app.use(routes);

app.use((error: Error, _request: Request, response: Response) => {
  if (error instanceof HttpError) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${error.message}`,
  });
});

export { app };
