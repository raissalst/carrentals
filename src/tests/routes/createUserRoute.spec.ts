import { AddressRepository, UserRepository } from '../../repositories';
import { expect, describe, it, beforeAll, afterAll } from '@jest/globals';
import { connection } from '..';
import { createUserController } from '../../controllers';
import { User } from '../../entities/User';
import app from '../../app';
import request from 'supertest';

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.dropTables();
  await connection.close();
});

describe('Create User test', () => {
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

  it('create new user', async () => {
    const requestBody = userMock;

    const response = await request(app).post('/api/users').send(requestBody);

    const responseBody = response.body;
    expect(response.statusCode).toBe(201);
    expect(responseBody.name).toContain('Roberto');
    expect(typeof responseBody).toBe('object');
  });

  it('does not create a new user', async () => {
    const { email, ...newMock } = userMock;
    const requestBody = newMock;

    const response = await request(app).post('/api/users').send(requestBody);

    const responseBody = response.body;
    expect(response.statusCode).toBe(400);
    expect(responseBody.error).toContain("email is a required field")
  });
  
});
