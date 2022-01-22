import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICreateUrlDTO } from '@modules/urls/dtos/ICreateUrlDTO';
import { Url } from '@modules/urls/infra/typeorm/entities/Url';
import { IUrlsRepository } from '@modules/urls/repositories/IUrlsRepository';

import { CreateUrlError } from './CreateUrlError';

type IRequest = ICreateUrlDTO;

@injectable()
export class CreateUrlUseCase {
  constructor(
    @inject('UrlsRepository')
    private urlsRepository: IUrlsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ name, original_url, user_id }: IRequest): Promise<Url> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new CreateUrlError('User not found.');
    }

    const urlExists = await this.urlsRepository.findByNameAndUser(
      name,
      user_id,
    );

    if (urlExists) {
      throw new CreateUrlError('You already have another URL with this name.');
    }

    const url = await this.urlsRepository.create({
      name,
      original_url,
      user_id,
    });

    return url;
  }
}
