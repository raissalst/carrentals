import { expect, describe, it, beforeAll, afterAll } from '@jest/globals';
import { connection } from '../..';
import app from '../../../app';
import request from 'supertest';
import { UserRepository } from '../../../repositories';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../../configs';
import dotenv from 'dotenv';
import { v4 } from 'uuid';

dotenv.config();

afterAll(async () => {
  await connection.dropTables();
  await connection.close();
});

describe('Controller getAllRentals test', () => {
  const userMock = {
    id: v4(),
    name: 'Jhon Doe',
    email: 'jhon@mail.com',
    password: '1234',
    cpf: '123.123.123-12',
    phone: '1191234-1234',
    userType: 'cliente',
    isActive: true,
    addressId: v4(),
  };
  let adminToken: string;
  let userToken: string;
  beforeAll(async () => {
    await connection.create();
    const user = await new UserRepository().saveUser(userMock as any);
    const admin = await new UserRepository().findByEmail(
      process.env.ADMIN_EMAIL
    );

    adminToken = jwt.sign({ user: admin }, jwtConfig.secretKey, {
      expiresIn: jwtConfig.expiresIn,
    });

    userToken = jwt.sign({ user }, jwtConfig.secretKey, {
      expiresIn: jwtConfig.expiresIn,
    });
  });
  it('401,Authenticated User but not is Admin', async () => {
    const response = await request(app)
      .get('/api/rentals')
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.statusCode).toBe(401);
  });
  it('200,Authenticated User and is Admin', async () => {
    const response = await request(app)
      .get('/api/rentals')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(response.statusCode).toBe(200);
  });
  it('401,Unauthenticated user', async () => {
    const response = await request(app).get('/api/rentals');
    expect(response.statusCode).toBe(401);
  });
});
