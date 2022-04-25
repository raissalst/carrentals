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

describe('', () => {
  it('Authenticated User but not is Admin', async () => {});
  it('Authenticated User and is Admin', async () => {});
  it('Unauthenticated user', async () => {});
});
