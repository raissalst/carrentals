import { beforeAll, describe, expect, it } from '@jest/globals';
import request from 'supertest';
import app from '../../../app';
import { connection } from '../../index';

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.clearTables();
  await connection.dropTables();
  await connection.close();
});

// // executada antes de cada teste
// beforeEach(async () => {});

// // executada depois de cada teste
// afterEach(async () => {});

// const admLogin = async () => {
//   const UserMock = {
//     username: 'admin',
//     password: '1234',
//   };

//   const loginResponse = await request(app).post('/users/login').send(UserMock);
//   return loginResponse.body.accessToken;
// };

describe('Testing the /get/Users route', () => {

//   it('should return status code 200', async () => {
//     // const token = await admLogin();
//     const response = await request(app)
//       .get('/api/users')
//       // .set('Authorization', `Bearer ${token}`);
//     const responseBody = response.body;
//     expect(response.statusCode).toBe(401);
//     // expect(typeof responseBody).toBe('object');
//   });

  it('should not get users without admin token', async () => {

    const response = await request(app).get('/api/users')

    // const responseBody = response.body;
    expect(response.statusCode).toBe(401);
  });
});