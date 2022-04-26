import { describe, it, expect, afterAll, beforeAll } from '@jest/globals';
import request from 'supertest';
import app from '../../../app';
import { connection } from '../..';
import { v4 } from 'uuid';
import { CarRepository, UserRepository } from '../../../repositories';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../../configs';

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.dropTables();
  await connection.close();
});

describe('rent a car tests', () => {
  let car;
  let user;

  beforeAll(async () => {
    car = await createCarMock();
    user = await createUserMock();
  });
  it('200, rent success', async () => {
    const response = await request(app).post(`/api/cars/${car.id}`);

    expect(response.statusCode).toBe(200);
  });
});

const createUserMock = async () => {
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

  const user = await new UserRepository().saveUser(userMock as any);

  const userToken = jwt.sign({ user }, jwtConfig.secretKey, {
    expiresIn: jwtConfig.expiresIn,
  });

  return { user, userToken };
};

const createCarMock = async () => {
  const carMock = {
    id: v4(),
    name: 'voyage',
    model: 'GTS',
    brand: 'VW',
    year: '1991',
    color: 'branco',
    doors: 3,
    fuelType: 'alcool',
    plate: 'LPY78UY',
    gear: 'manual',
    chassis: '3C8FY68B82T297664',
    currentMileage: 856,
    rentalPricePerDay: 95.0,
    availableToRent: true,
    isActive: true,
    companyId: v4(),
  };

  const car = await new CarRepository().saveCar(carMock as any);

  return car;
};
