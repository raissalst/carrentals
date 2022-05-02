import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
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

describe('get car by id route tests', () => {
  let adminToken;
  beforeAll(async () => {
    const admin = await new UserRepository().findByEmail(
      process.env.ADMIN_EMAIL
    );

    adminToken = jwt.sign({ user: admin }, jwtConfig.secretKey, {
      expiresIn: jwtConfig.expiresIn,
    });
  });
  it('200, should get a car with success', async () => {
    const car = await createCar();

    const response = await request(app)
      .get(`/api/cars/${car.id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toStrictEqual(car.id);
  });

  it('404, should not get a car passing an id that does not exist in database', async () => {
    const response = await request(app)
      .get(`/api/cars/${v4()}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({ error: 'Car not found.' });
    expect(response.body.isActive).toBeFalsy();
  });

  it('400, should not get a car with an invalid id', async () => {
    const response = await request(app)
      .get(`/api/cars/9bb89e15-0244-48c2-a770-5c7b457eb9d`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ error: 'Id must be UUID.' });
  });

  it('401, should not get a car without token', async () => {
    const response = await request(app).get(`/api/cars/${v4()}`);

    expect(response.statusCode).toBe(401);
    expect(response.body).toStrictEqual({
      error: 'Missing authorization token.',
    });
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

  const resp = await new CarRepository().saveCar(carMock as any);

  return resp[0];
};
