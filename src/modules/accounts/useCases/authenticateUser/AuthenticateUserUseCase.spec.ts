import { hash } from 'bcrypt';

import { InMemoryUsersRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersRepository';

import { AuthenticateUserError } from './AuthenticateUserError';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let usersRepository: InMemoryUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate User UseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
  });

  it('should be able to authenticate user', async () => {
    const passwordHash = await hash('password', 8);

    const user = await usersRepository.create({
      name: 'User Test',
      email: 'user@test.com',
      password: passwordHash,
    });

    const response = await authenticateUserUseCase.execute({
      email: 'user@test.com',
      password: 'password',
    });

    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('user');
    expect(response.user).toHaveProperty('id');
    expect(response.user.id).toBe(user.id);
  });

  it('should not be able to authenticate user with wrong email', async () => {
    expect(async () => {
      const passwordHash = await hash('password', 8);

      await usersRepository.create({
        name: 'User Test',
        email: 'user@test.com',
        password: passwordHash,
      });

      await authenticateUserUseCase.execute({
        email: 'invalid@test.com',
        password: 'password',
      });
    }).rejects.toBeInstanceOf(AuthenticateUserError);
  });

  it('should not be able to authenticate user with wrong password', async () => {
    expect(async () => {
      const passwordHash = await hash('password', 8);

      await usersRepository.create({
        name: 'User Test',
        email: 'user@test.com',
        password: passwordHash,
      });

      await authenticateUserUseCase.execute({
        email: 'test@test.com',
        password: 'invalid-password',
      });
    }).rejects.toBeInstanceOf(AuthenticateUserError);
  });
});
