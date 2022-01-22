import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}
