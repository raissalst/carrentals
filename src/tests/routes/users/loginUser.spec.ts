import { describe, expect, it, beforeAll, afterAll } from '@jest/globals';
import { UserRepository } from '../../../repositories';
import request from 'supertest';
import dotenv from 'dotenv';
import { connection } from '../../index';
import app from '../../../app';
import { v4 } from 'uuid';

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

  it('401, try login with desactivated user', async () => {
    const user = await createUserMock();
    const requestWrongBody = {
      email: user.email,
      password: user.password,
    };
    const response = await request(app)
      .post('/api/users/login')
      .send(requestWrongBody);
    const responseBody = response.body;
    expect(response.statusCode).toBe(401);
    expect(responseBody).toStrictEqual({
      error: 'Your profile as deactivated.',
    });
  });
});

const createUserMock = async () => {
  const userMock = {
    id: v4(),
    name: 'Jhon Doe',
    email: 'jhon@mail.com',
    password: '1234',
    cpf: '123.123.123-12',
    phone: '1191234-1234',
    userType: 'cliente',
    isActive: false,
    addressId: v4(),
  };

  const user = await new UserRepository().saveUser(userMock as any);

  return user;
};
