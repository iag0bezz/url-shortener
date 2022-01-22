import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RedirectUrlUseCase } from './RedirectUrlUseCase';

export class RedirectUrlController {
  async handle(request: Request, response: Response): Promise<void> {
    const { name } = request.params;

    const redirectUrlUseCase = container.resolve(RedirectUrlUseCase);

    const url = await redirectUrlUseCase.execute({
      name,
    });

    return response.redirect(308, url.original_url);
  }
}
