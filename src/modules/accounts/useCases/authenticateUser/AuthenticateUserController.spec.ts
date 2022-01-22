import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Authenticate User Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const passwordHash = await hash('password', 8);

    await connection.query(`
      INSERT INTO users (id, name, email, password, created_at) VALUES ('${id}', 'User Test', 'user@test.com', '${passwordHash}', 'now()');
    `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to authenticate user', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'user@test.com',
      password: 'password',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
  });

  it('should not be able to authenticate user with wrong email', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'invalid@test.com',
      password: 'password',
    });

    expect(response.status).toBe(400);
  });
  it('should not be able to authenticate user with wrong password', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'user@test.com',
      password: 'invalid-password',
    });

    expect(response.status).toBe(400);
  });
});
