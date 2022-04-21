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

describe('Testing the /get/Users route', () => {

  it('should not get users without admin token', async () => {

    const response = await request(app).get('/api/users')

    expect(response.statusCode).toBe(401);
  });
});