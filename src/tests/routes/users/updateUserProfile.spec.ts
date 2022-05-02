import { expect, describe, it, beforeAll, afterAll } from '@jest/globals';
import { connection } from '../..';
import app from '../../../app';
import request, { Response } from 'supertest';

let responseBody: any;

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.dropTables();
  await connection.close();
});

describe('update user profile route tests', () => {
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

  it('should update a company profile', async () => {
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
    responseBody = response.body;

    const res = await request(app)
      .patch('/api/users/profile')
      .set('Authorization', `Bearer ${responseBody.token}`)
      .send({ name: 'Novo Nome S/A' });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toEqual('Novo Nome S/a');
  });

  it('should not update the userType key from empresa to admin', async () => {
    const res = await request(app)
      .patch('/api/users/profile')
      .set('Authorization', `Bearer ${responseBody.token}`)
      .send({ userType: 'admin' });

    expect(res.body.userType).toStrictEqual('empresa');
  });

  it('should update an address and return it with user data', async () => {
    const res = await request(app)
      .patch('/api/users/profile')
      .set('Authorization', `Bearer ${responseBody.token}`)
      .send({ address: 'Rua Caravelas, 2022' });
    expect(res.statusCode).toBe(200);
    expect(res.body.address.address).toStrictEqual('Rua Caravelas, 2022');
  });

  it('should not update without token', async () => {
    const res = await request(app)
      .patch('/api/users/profile')
      .set('Authorization', `Bearer`)
      .send({ address: 'Rua Caravelas, 2022' });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toEqual('Missing authorization token.');
  });
});
