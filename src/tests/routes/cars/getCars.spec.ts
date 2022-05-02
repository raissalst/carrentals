import { expect, describe, it, beforeAll, afterAll } from '@jest/globals';
import { connection } from '../..';
import app from '../../../app';
import { v4 } from 'uuid';
import request from 'supertest';
import { CarRepository, UserRepository } from '../../../repositories';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../../configs';

let adminToken;

beforeAll(async () => {
  await connection.create();
  const admin = await new UserRepository().findByEmail(process.env.ADMIN_EMAIL);

  adminToken = jwt.sign({ user: admin }, jwtConfig.secretKey, {
    expiresIn: jwtConfig.expiresIn,
  });
});

afterAll(async () => {
  await connection.dropTables();
  await connection.close();
});

describe('Get cars route tests', () => {
  it('should not get unavailable/inactive cars and return http status 200', async () => {
    const response = await request(app)
      .get('/api/cars')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([]);
  });

  it('should get all available/active cars and return http status 200', async () => {
    const car = await createCar();
    const { chassis, currentMileage, isActive, plate, ...outputCar } = car[0];

    const response = await request(app)
      .get('/api/cars')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([outputCar]);
  });
});

const createCar = async () => {
  const carMock = [
    {
      id: v4(),
      name: 'voyage',
      model: 'GTS',
      brand: 'VW',
      year: '1991',
      color: 'branco',
      doors: 2,
      fuelType: 'gasolina',
      plate: 'LPY78UY',
      gear: 'automatico',
      chassis: '3C8FY68B82T297664',
      currentMileage: 856,
      rentalPricePerDay: 95.0,
    },
  ];

  const resp = await new CarRepository().saveMultipleCars(carMock as any);

  return resp;
};
