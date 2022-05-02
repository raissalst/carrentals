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

describe('Create user route tests', () => {
  const userMock = {
    name: 'Roberto',
    email: 'roberto251@gmail.com',
    password: '123456',
    phone: '21997771234',
    userType: 'cliente',
    cpf: '223.147.334-42',
    address: 'Rua vinte e dois de outubro',
    city: 'São Gonçalo',
    state: 'RJ',
    country: 'Brasil',
  };

  it('should create a new user and return http status 201', async () => {
    const requestBody = userMock;

    const response = await request(app).post('/api/users').send(requestBody);

    const responseBody = response.body;
    expect(response.statusCode).toBe(201);
    expect(responseBody.name).toContain('Roberto');
    expect(typeof responseBody).toBe('object');
  });

  it('should not create a new user without an email key and return http status 400', async () => {
    const { email, ...newMock } = userMock;
    const requestBody = newMock;

    const response = await request(app).post('/api/users').send(requestBody);

    const responseBody = response.body;
    expect(response.statusCode).toBe(400);
    expect(responseBody.error).toContain('email is a required field');
  });

  it('should not create an admin user without an admin token and return http status 401', async () => {
    const { userType, ...newMock } = userMock;
    newMock['userType'] = 'admin';
    const requestBody = newMock;

    const response = await request(app).post('/api/users').send(requestBody);

    const responseBody = response.body;
    expect(response.statusCode).toBe(401);
    expect(responseBody.error).toContain('Missing authorization token.');
  });
});
