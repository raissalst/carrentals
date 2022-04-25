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

describe('get user information by id', () => {
  const companyMock = {
    name: 'Company One',
    email: 'companyone@gmail.com',
    password: '1234',
    phone: '21997771234',
    userType: 'empresa',
    cnpj: '29.788.702/0001-22',
    address: 'Rua da passagem, 20',
    city: 'Petrópolis',
    state: 'RJ',
    country: 'Brasil',
  };

  const customerMockOne = {
    name: 'Paschoal',
    email: 'paschoal@gmail.com',
    password: '1234',
    phone: '21996571234',
    userType: 'cliente',
    cpf: '105.985.333-23',
    address: 'Rua um dois tres, 40',
    city: 'Teresópolis',
    state: 'RJ',
    country: 'Brasil',
  };

  const customerMockTwo = {
    name: 'Helena',
    email: 'helena@gmail.com',
    password: '1234',
    phone: '21995634234',
    userType: 'cliente',
    cpf: '119.555.446-23',
    address: 'Rua tres, 60',
    city: 'Angra dos Reis',
    state: 'RJ',
    country: 'Brasil',
  };

  it('should retrieve a complete company profile with admin logged', async () => {
    const createRequestBody = companyMock;
    const createResponse = await request(app)
      .post('/api/users')
      .send(createRequestBody);

    const responseCompanyBody = createResponse.body;

    const requestLoginBody = {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    };

    const response = await request(app)
      .post('/api/users/login')
      .send(requestLoginBody);
    const responseLoginBody = response.body;

    const res = await request(app)
      .get(`/api/users/${responseCompanyBody.id}`)
      .set('Authorization', `Bearer ${responseLoginBody.token}`);

    expect(res.statusCode).toBe(200);
    expect(Object.keys(res.body)).toContain('address');
    expect(Object.keys(res.body)).toContain('phone');
  });

  it('should not retrieve a customer profile with customer logged', async () => {
    const createRequestBodyCustomerOne = customerMockOne;
    const createResponseCustomerOne = await request(app)
      .post('/api/users')
      .send(createRequestBodyCustomerOne);

    const responseCustomerOneBody = createResponseCustomerOne.body;

    const createRequestBodyCustomerTwo = customerMockTwo;
    const createResponseCustomerTwo = await request(app)
      .post('/api/users')
      .send(createRequestBodyCustomerTwo);

    const responseCustomerTwoBody = createResponseCustomerTwo.body;

    const requestLoginCustomerBody = {
      email: customerMockOne.email,
      password: customerMockOne.password,
    };

    const response = await request(app)
      .post('/api/users/login')
      .send(requestLoginCustomerBody);
    const responseLoginCustomerBody = response.body;

    const res = await request(app)
      .get(`/api/users/${responseCustomerTwoBody.id}`)
      .set('Authorization', `Bearer ${responseLoginCustomerBody.token}`);

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toEqual('Unauthorized');
  });
});
