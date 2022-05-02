import { describe, expect, it, beforeAll, afterAll } from '@jest/globals';
import { UserRepository } from '../../../repositories';
import request from 'supertest';
import dotenv from 'dotenv';
import { connection } from '../../index';
import app from '../../../app';
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';

dotenv.config();

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.dropTables();
  await connection.close();
});

describe('Login user route tests', () => {
  it('should login an user and return http status 200', async () => {
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
  it('should not login an user passing the wrong password and return http status 401', async () => {
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

  it('should not login a deactivated user and return http status 401', async () => {
    const user = await createUserMock();
    const requestBody = {
      email: user.email,
      password: '1234',
    };
    const response = await request(app)
      .post('/api/users/login')
      .send(requestBody);
    const responseBody = response.body;
    expect(response.statusCode).toBe(401);
    expect(responseBody).toStrictEqual({
      error: 'Your profile is deactivated.',
    });
  });
  it('should login with a deactivated company and return http status 200', async () => {
    const user = await createCompanyMock();
    const requestBody = {
      email: user.email,
      password: '1234',
    };
    const response = await request(app)
      .post('/api/users/login')
      .send(requestBody);

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeTruthy();
  });

  it('should not login with a deactivated admin and return http status 401', async () => {
    const admin = await new UserRepository().findByEmail(
      process.env.ADMIN_EMAIL
    );
    await new UserRepository().updateUser({ isActive: false }, admin.id);
    const requestBody = {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    };
    const response = await request(app)
      .post('/api/users/login')
      .send(requestBody);
    const responseBody = response.body;
    expect(response.statusCode).toBe(401);
    expect(responseBody).toStrictEqual({
      error: 'Your profile is deactivated.',
    });
  });
});

const createUserMock = async () => {
  const userMock = {
    id: v4(),
    name: 'Jhon Doe',
    email: 'jhon@mail.com',
    password: bcrypt.hashSync('1234', 10),
    cpf: '123.123.123-12',
    phone: '1191234-1234',
    userType: 'cliente',
    isActive: false,
    addressId: v4(),
  };

  const user = await new UserRepository().saveUser(userMock as any);

  return user;
};
const createCompanyMock = async () => {
  const companyMock = {
    id: v4(),
    name: 'Company One',
    email: 'company@mail.com',
    password: bcrypt.hashSync('1234', 10),
    cnpj: '12.123.123/0001-12',
    phone: '1191234-1234',
    userType: 'empresa',
    isActive: false,
    addressId: v4(),
  };

  const company = await new UserRepository().saveUser(companyMock as any);

  return company;
};
