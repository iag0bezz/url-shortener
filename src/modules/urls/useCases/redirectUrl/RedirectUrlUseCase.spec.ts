import { InMemoryUrlsRepository } from '@modules/urls/repositories/in-memory/InMemoryUrlsRepository';

import { RedirectUrlError } from './RedirectUrlError';
import { RedirectUrlUseCase } from './RedirectUrlUseCase';

let urlsRepository: InMemoryUrlsRepository;
let redirectUrlUseCase: RedirectUrlUseCase;

describe('Redirect Url UseCase', () => {
  beforeEach(() => {
    urlsRepository = new InMemoryUrlsRepository();
    redirectUrlUseCase = new RedirectUrlUseCase(urlsRepository);
  });

  it('should be able to find url', async () => {
    await urlsRepository.create({
      name: 'url-test',
      original_url: 'https://www.google.com/',
      user_id: 'user_id',
    });

    const url = await redirectUrlUseCase.execute({
      name: 'url-test',
    });

    expect(url).toHaveProperty('id');
    expect(url.name).toBe('url-test');
    expect(url.original_url).toBe('https://www.google.com/');
    expect(url.clicks).toBe(1);
  });

  it('should not be able to find url', async () => {
    expect(async () => {
      await redirectUrlUseCase.execute({
        name: 'invalid-url',
      });
    }).rejects.toBeInstanceOf(RedirectUrlError);
  });
});
