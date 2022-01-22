import { container } from 'tsyringe';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UrlsRepository } from '@modules/urls/infra/typeorm/repositories/UrlsRepository';
import { IUrlsRepository } from '@modules/urls/repositories/IUrlsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUrlsRepository>('UrlsRepository', UrlsRepository);
