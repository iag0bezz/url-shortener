import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Create User Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create user', async () => {
    const response = await request(app).post('/users').send({
      name: 'User Test',
      email: 'user@test.com',
      password: 'password',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('User Test');
    expect(response.body.email).toBe('user@test.com');
  });

  it('should not be able to create user with existent email', async () => {
    const response = await request(app).post('/users').send({
      name: 'User Test',
      email: 'user@test.com',
      password: 'password',
    });

    expect(response.status).toBe(400);
  });
});
