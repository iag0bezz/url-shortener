import { ICreateUrlDTO } from '../dtos/ICreateUrlDTO';
import { Url } from '../infra/typeorm/entities/Url';

export interface IUrlsRepository {
  create(data: ICreateUrlDTO): Promise<Url>;
  findById(id: string): Promise<Url>;
  findByName(name: string): Promise<Url>;
  incrementClick(url: Url): Promise<Url>;
}
