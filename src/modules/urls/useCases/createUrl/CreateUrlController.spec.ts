import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Create Url Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const passwordHash = await hash('password', 8);

    await connection.query(`
      INSERT INTO users (id, name, email, password, created_at) VALUES ('${id}', 'User Test', 'user@test.com', '${passwordHash}', 'now()');
    `);

    await connection.query(`
      INSERT INTO users (id, name, email, password, created_at) VALUES ('93c26ee9-c75b-4ac3-8653-339f6071a742', 'User Test 2', 'user_2@test.com', '${passwordHash}', 'now()');
    `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create shorter url', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'user@test.com',
      password: 'password',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/urls')
      .send({
        name: 'Url Test',
        original_url: 'https://www.google.com/',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Url Test');
    expect(response.body.original_url).toBe('https://www.google.com/');
  });

  it('should not be able to create shorter url with same name', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'user@test.com',
      password: 'password',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/urls')
      .send({
        name: 'Url Test',
        original_url: 'https://www.google.com/',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
  });
});
