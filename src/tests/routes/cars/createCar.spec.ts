import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { connection } from '../..';
import app from '../../../app';
import request from 'supertest';
import { CarRepository, UserRepository } from '../../../repositories';
import { v4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../../configs';

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.dropTables();
  await connection.close();
});
describe('Create car route tests', () => {
  let company = {
    token: '',
    data: {},
  };

  let adminToken;
  beforeAll(async () => {
    const newCompany = await createCompany();
    company.data = newCompany;
    company.token = jwt.sign({ user: newCompany }, jwtConfig.secretKey, {
      expiresIn: jwtConfig.expiresIn,
    });

    const admin = await new UserRepository().findByEmail(
      process.env.ADMIN_EMAIL
    );

    adminToken = jwt.sign({ user: admin }, jwtConfig.secretKey, {
      expiresIn: jwtConfig.expiresIn,
    });
  });

  const reqMock = {
    cars: [
      {
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
    ],
  };
  it('should create a car and return http status 201', async () => {
    const response = await request(app)
      .post('/api/cars')
      .send(reqMock)
      .set('Authorization', `Bearer ${company.token}`);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveLength(1);

    const car = await new CarRepository().getCarById(response.body[0].id);

    expect(car).toBeTruthy();
  });

  it('should not create a car without a token and return http status 401', async () => {
    const response = await request(app).post('/api/cars').send(reqMock);

    expect(response.statusCode).toBe(401);
    expect(response.body).toStrictEqual({
      error: 'Missing authorization token.',
    });
  });

  it('should not create a car with an admin token and return http status 401', async () => {
    const response = await request(app)
      .post('/api/cars')
      .send(reqMock)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(401);
    expect(response.body).toStrictEqual({ error: 'Unauthorized.' });
  });

  it('should not create a car with the request body without an array and return http status 400', async () => {
    const otherMock = {
      cars: reqMock.cars[0],
    };
    const response = await request(app)
      .post('/api/cars')
      .send(otherMock)
      .set('Authorization', `Bearer ${company.token}`);

    expect(response.statusCode).toBe(400);
  });
});

const createCompany = async () => {
  const companyMock = {
    id: v4(),
    name: 'Roberto',
    email: 'roberto251@gmail.com',
    password: '123456',
    phone: '21997771234',
    userType: 'empresa',
    cpf: '223.147.334-42',
    addressId: v4(),
  };
  const newCompany = await new UserRepository().saveUser(companyMock as any);

  return newCompany;
};
