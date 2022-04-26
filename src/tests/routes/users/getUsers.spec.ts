import { expect, describe, it, beforeAll, afterAll } from '@jest/globals';
import { connection } from '../..';
import app from '../../../app';
import request from 'supertest';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../../configs';
import { UserRepository } from '../../../repositories';

dotenv.config();

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.dropTables();
  await connection.close();
});

describe('Testing the /get/Users route', () => {

  it('should retrieve all profiles with admin logged', async () => {
 
    const requestLoginBody = {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    };

    const response = await request(app)
      .post('/api/users/login')
      .send(requestLoginBody);
    const responseLoginBody = response.body;

    // const admin = await new UserRepository().findByEmail(
    //   process.env.ADMIN_EMAIL
    // );

    // const adminToken = jwt.sign({ user: admin }, jwtConfig.secretKey, {
    //   expiresIn: jwtConfig.expiresIn,
    // });
    
    const res = await request(app)
    .get(`/api/users`)
    .set('Authorization', `Bearer ${responseLoginBody.token}`);
    
    expect(res.statusCode).toBe(200);
  });

  it('should not get users without admin token', async () => {

    const response = await request(app).get('/api/users')

    expect(response.statusCode).toBe(401);
  });
});