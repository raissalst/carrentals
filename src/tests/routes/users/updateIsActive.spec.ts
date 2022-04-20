import { describe, it, beforeAll, afterAll, expect } from '@jest/globals';
import request from 'supertest';
import { connection } from '../..';
import app from '../../../app';
import { v4 } from 'uuid';
import { UserRepository } from '../../../repositories';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../../configs';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.dropTables();
  await connection.close();
});

describe('update isActive users', () => {
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

  it('401, try update with no token', async () => {
    const response = await request(app).patch(`/api/users/${userMock.id}`);

    expect(response.statusCode).toBe(401);
  });

  it('204, try update with admin token', async () => {
    const response = await request(app)
      .patch(`/api/users/${userMock.id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(204);
    expect(response.body).toStrictEqual({});

    const user = await new UserRepository().findByEmail(userMock.email);

    expect(user.isActive).toBe(false);
  });

  it('401, try update with user token', async () => {
    const response = await request(app)
      .patch(`/api/users/${userMock.id}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.statusCode).toBe(401);
  });

  it('204, try update wrong user id', async () => {
    const response = await request(app)
      .patch(`/api/users/${v4()}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(404);
  });
});
