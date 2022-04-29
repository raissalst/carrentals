import { expect, describe, it, beforeAll, afterAll } from '@jest/globals';
import { connection } from '../..';
import app from '../../../app';
import request from 'supertest';

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.dropTables();
  await connection.close();
});

describe('get user profile', () => {
  const companyMock = {
    name: 'Company SA',
    email: 'companysa@gmail.com',
    password: '123456',
    phone: '21997771234',
    userType: 'empresa',
    cnpj: '29.594.702/0001-22',
    address: 'Rua company, 100',
    city: 'Petrópolis',
    state: 'RJ',
    country: 'Brasil',
  };

  it('should retrieve a customer profile', async () => {
    const requestBody = {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    };

    const response = await request(app)
      .post('/api/users/login')
      .send(requestBody);
    const responseBody = response.body;

    const res = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${responseBody.token}`);

    expect(res.statusCode).toBe(200);
    expect(Object.keys(res.body)).toContain('cpf');
  });

  it('should not retrieve a user profile with a badly formed token', async () => {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

    const res = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(401);
    expect(res.body.error.name).toEqual('JsonWebTokenError');
  });

  it('should retrieve a company profile', async () => {
    const createRequestBody = companyMock;
    const createResponse = await request(app)
      .post('/api/users')
      .send(createRequestBody);

    const loginRequestBody = {
      email: companyMock.email,
      password: companyMock.password,
    };

    const response = await request(app)
      .post('/api/users/login')
      .send(loginRequestBody);
    const responseBody = response.body;

    const res = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${responseBody.token}`);

    expect(res.statusCode).toBe(200);
    expect(Object.keys(res.body)).toContain('cnpj');
  });

  it('should not retrieve an user profile without a token', async () => {
    const res = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer`);

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toEqual('Missing authorization token.');
  });
});
