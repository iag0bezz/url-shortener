import { ICreateUrlDTO } from '@modules/urls/dtos/ICreateUrlDTO';
import { Url } from '@modules/urls/infra/typeorm/entities/Url';

import { IUrlsRepository } from '../IUrlsRepository';

export class InMemoryUrlsRepository implements IUrlsRepository {
  urls: Url[] = [];

  async create({
    name,
    original_url,
    clicks = 0,
    user_id,
  }: ICreateUrlDTO): Promise<Url> {
    const url = new Url();

    Object.assign(url, {
      name,
      original_url,
      user_id,
      clicks,
      created_at: new Date(),
    });

    this.urls.push(url);

    return url;
  }

  async findById(id: string): Promise<Url> {
    const url = this.urls.find(url => url.id === id);

    return url;
  }

  async findByNameAndUser(name: string, user_id: string): Promise<Url> {
    const url = this.urls.find(
      url => url.name === name && url.user_id === user_id,
    );

    return url;
  }
}
