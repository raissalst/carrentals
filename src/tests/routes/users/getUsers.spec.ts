import { expect, describe, it, beforeAll, afterAll } from '@jest/globals';
import { connection } from '../..';
import app from '../../../app';
import request from 'supertest';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.dropTables();
  await connection.close();
});

describe('Get users route tests', () => {
  it('should retrieve all profiles with an admin logged and return http status 200', async () => {
    const requestLoginBody = {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    };

    const response = await request(app)
      .post('/api/users/login')
      .send(requestLoginBody);
    const responseLoginBody = response.body;

    const res = await request(app)
      .get(`/api/users`)
      .set('Authorization', `Bearer ${responseLoginBody.token}`);

    expect(res.statusCode).toBe(200);
  });

  it('should not get users without an admin token and return http status 401', async () => {
    const response = await request(app).get('/api/users');

    expect(response.statusCode).toBe(401);
  });
});
