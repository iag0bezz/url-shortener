import { ICreateUrlDTO } from '@modules/urls/dtos/ICreateUrlDTO';
import { Url } from '@modules/urls/infra/typeorm/entities/Url';

import { IUrlsRepository } from '../IUrlsRepository';

export class InMemoryUrlsRepository implements IUrlsRepository {
  public urls: Url[] = [];

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

  async incrementClick(url: Url): Promise<Url> {
    Object.assign(url, {
      clicks: url.clicks + 1,
    });

    return url;
  }

  async findById(id: string): Promise<Url> {
    const url = this.urls.find(url => url.id === id);

    return url;
  }

  async findByName(name: string): Promise<Url> {
    const url = this.urls.find(url => url.name === name);

    return url;
  }
}
