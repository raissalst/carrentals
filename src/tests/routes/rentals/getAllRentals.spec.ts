import { expect, describe, it, beforeAll, afterAll } from '@jest/globals';
import { RentalRepository, UserRepository } from '../../../repositories';
import { jwtConfig } from '../../../configs';
import { connection } from '../..';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../../app';
import dotenv from 'dotenv';
import { v4 } from 'uuid';

dotenv.config();

afterAll(async () => {
  await connection.dropTables();
  await connection.close();
});

describe('get all rentals test', () => {
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
  const rentalMock = {
    id: '63ed70b9-691e-4f4b-bb15-e4a8d87632ae',
    rentalStartDate: '2023-05-20T03:00:00.000Z',
    rentalReturnDate: '2023-05-25T03:00:00.000Z',
    returnedCarDate: null,
    returnedCar: false,
    rentalPricePerDay: 60,
    rentalPricePreview: 180,
    rentalPriceTotal: 180,
    mileageRan: 40,
    customer: userMock.id,
  };

  let adminToken: string;
  let userToken: string;
  beforeAll(async () => {
    await connection.create();
    const user = await new UserRepository().saveUser(userMock as any);
    const rental = await new RentalRepository().saveRental(rentalMock as any);
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
  it('401, authenticated user that is not of admin type', async () => {
    const response = await request(app)
      .get('/api/rentals')
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.statusCode).toBe(401);
  });
  it('200, authenticated user that is of admin type', async () => {
    const response = await request(app)
      .get('/api/rentals')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(response.statusCode).toBe(200);
  });
  it('401, unauthenticated user', async () => {
    const response = await request(app).get('/api/rentals');
    expect(response.statusCode).toBe(401);
  });
  it('200, get rentals with query params', async () => {
    const response = await request(app)
      .get('/api/rentals?returnedCar=true')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(response.statusCode).toBe(200);
  });
});
