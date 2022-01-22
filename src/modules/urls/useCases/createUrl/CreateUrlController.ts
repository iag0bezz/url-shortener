import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUrlUseCase } from './CreateUrlUseCase';

export class CreateUrlController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { name, original_url } = request.body;

    const createUrlUseCase = container.resolve(CreateUrlUseCase);

    const url = await createUrlUseCase.execute({
      name,
      original_url,
      user_id: id as string,
    });

    return response.status(201).json(url);
  }
}
