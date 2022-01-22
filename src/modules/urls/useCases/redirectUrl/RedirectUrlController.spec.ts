import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';

import { UrlsRepository } from '@modules/urls/infra/typeorm/repositories/UrlsRepository';
import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
let urlsRepository: UrlsRepository;

describe('Redirect Url Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    urlsRepository = new UrlsRepository();

    const passwordHash = await hash('password', 8);

    await connection.query(`
      INSERT INTO users (id, name, email, password, created_at) VALUES ('93c26ee9-c75b-4ac3-8653-339f6071a742', 'User Test', 'user@test.com', '${passwordHash}', 'now()');
    `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to redirect', async () => {
    await urlsRepository.create({
      name: 'url-test',
      original_url: 'https://www.google.com/',
      user_id: '93c26ee9-c75b-4ac3-8653-339f6071a742',
    });

    const response = await request(app).get('/url-test').send();

    expect(response.status).toBe(308);
  });

  it('should not be able to redirect in non-existent url', async () => {
    const response = await request(app).get('/invalid-url').send();

    expect(response.status).toBe(400);
  });
});
