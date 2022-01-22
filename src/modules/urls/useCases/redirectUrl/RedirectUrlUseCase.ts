import { inject, injectable } from 'tsyringe';

import { Url } from '@modules/urls/infra/typeorm/entities/Url';
import { IUrlsRepository } from '@modules/urls/repositories/IUrlsRepository';

import { RedirectUrlError } from './RedirectUrlError';

interface IRequest {
  name: string;
}

@injectable()
export class RedirectUrlUseCase {
  constructor(
    @inject('UrlsRepository')
    private urlsRepository: IUrlsRepository,
  ) {}

  async execute({ name }: IRequest): Promise<Url> {
    const url = await this.urlsRepository.findByName(name);

    if (!url) {
      throw new RedirectUrlError('Invalid url name or does not exists.');
    }

    await this.urlsRepository.incrementClick(url);

    return url;
  }
}
