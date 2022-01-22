/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { getRepository, Repository } from 'typeorm';

import { ICreateUrlDTO } from '@modules/urls/dtos/ICreateUrlDTO';
import { IUrlsRepository } from '@modules/urls/repositories/IUrlsRepository';

import { Url } from '../entities/Url';

export class UrlsRepository implements IUrlsRepository {
  private repository: Repository<Url>;

  constructor() {
    this.repository = getRepository(Url);
  }

  async create({
    name,
    original_url,
    user_id,
    clicks,
    id,
  }: ICreateUrlDTO): Promise<Url> {
    const url = this.repository.create({
      name,
      original_url,
      user_id,
      clicks,
      id,
    });

    await this.repository.save(url);

    return url;
  }

  async incrementClick(url: Url): Promise<Url> {
    url.clicks++;

    return this.create({
      ...url,
    });
  }

  async findById(id: string): Promise<Url> {
    const url = await this.repository.findOne(id);

    return url;
  }

  async findByName(name: string): Promise<Url> {
    const url = await this.repository.findOne({ name });

    return url;
  }
}
