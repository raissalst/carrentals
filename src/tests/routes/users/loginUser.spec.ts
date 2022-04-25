import { describe, expect, it, beforeAll, afterAll } from '@jest/globals';
import { UserRepository } from '../../../repositories';
import request from 'supertest';
import dotenv from 'dotenv';
import { connection } from '../../index';
import app from '../../../app';

dotenv.config();

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.dropTables();
  await connection.close();
});

describe('test loginUser controller', () => {
  it('test sucess login', async () => {
    const requestBody = {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    };

    const response = await request(app)
      .post('/api/users/login')
      .send(requestBody);
    const responseBody = response.body;
    expect(response.statusCode).toBe(200);
    expect(typeof responseBody).toBe('object');
    expect(responseBody.token).toBeTruthy();
  });
  it('test fail, with wrong password', async () => {
    const requestWrongBody = {
      email: process.env.ADMIN_EMAIL,
      password: '4321',
    };
    const response = await request(app)
      .post('/api/users/login')
      .send(requestWrongBody);
    const responseBody = response.body;
    expect(response.statusCode).toBe(401);
    expect(typeof responseBody).toBe('object');
  });
});
