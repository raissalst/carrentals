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

describe('Testing the /delete/UserProfile route', () => {

    it('should not delete users without admin token', async () => {
  
      const response = await request(app).delete('/api/users/profile')
  
      expect(response.statusCode).toBe(401);
    });
  });