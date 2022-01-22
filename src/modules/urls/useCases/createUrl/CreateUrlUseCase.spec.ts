import { InMemoryUsersRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersRepository';
import { InMemoryUrlsRepository } from '@modules/urls/repositories/in-memory/InMemoryUrlsRepository';

import { CreateUrlUseCase } from './CreateUrlUseCase';

let urlsRepository: InMemoryUrlsRepository;
let usersRepository: InMemoryUsersRepository;
let createUrlUseCase: CreateUrlUseCase;

describe('Create Url UseCase', () => {
  beforeEach(() => {
    urlsRepository = new InMemoryUrlsRepository();
    usersRepository = new InMemoryUsersRepository();
    createUrlUseCase = new CreateUrlUseCase(urlsRepository, usersRepository);
  });

  it('should be able to create url', async () => {
    const user = await usersRepository.create({
      name: 'User Test',
      email: 'user@test.com',
      password: 'password',
    });

    const url = await createUrlUseCase.execute({
      name: 'Name Test',
      original_url: 'https://www.google.com/',
      user_id: user.id as string,
    });

    expect(url).toHaveProperty('id');
    expect(url.name).toBe('Name Test');
    expect(url.original_url).toBe('https://www.google.com/');
  });
});
