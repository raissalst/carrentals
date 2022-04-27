import { beforeAll, describe, expect, it } from '@jest/globals';
import request from 'supertest';
import app from '../../../app';
import { connection } from '../../index';
import { v4 } from 'uuid';
import { UserRepository } from '../../../repositories';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../../configs';
import dotenv from 'dotenv';

dotenv.config();

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

let userToken: string;

beforeAll(async () => {
  await connection.create();

  const user = await new UserRepository().saveUser(userMock as any);

  userToken = jwt.sign({ user }, jwtConfig.secretKey, {
    expiresIn: jwtConfig.expiresIn,
  });
});


afterAll(async () => {
  await connection.clearTables();
  await connection.dropTables();
  await connection.close();
});

describe('Testing the /delete/UserProfile route', () => {

  it('should set isActive false', async () => {
    const response = await request(app)
      .delete(`/api/users/profile`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.statusCode).toBe(204);
    expect(response.body).toStrictEqual({});

    const user = await new UserRepository().findByEmail(userMock.email);

    expect(user.isActive).toBe(false);
  });

    it('should not delete users without token', async () => {
  
      const response = await request(app).delete('/api/users/profile')
  
      expect(response.statusCode).toBe(401);
    });
  });