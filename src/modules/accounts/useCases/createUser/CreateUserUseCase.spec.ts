import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { CreateUserError } from './CreateUserError';
import { CreateUserUseCase } from './CreateUserUseCase';

let usersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe('Create User UseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it('should be able to create user', async () => {
    const user = await createUserUseCase.execute({
      name: 'User Test',
      email: 'user@test.com',
      password: 'password',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('User Test');
    expect(user.email).toBe('user@test.com');
  });

  it('should not be able to create user with existent email', async () => {
    expect(async () => {
      await usersRepository.create({
        name: 'User Test',
        email: 'user@test.com',
        password: 'password',
      });

      await createUserUseCase.execute({
        name: 'User Test 2',
        email: 'user@test.com',
        password: 'password',
      });
    }).rejects.toBeInstanceOf(CreateUserError);
  });
});
