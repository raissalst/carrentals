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

describe('Rent a car route tests', () => {
  let car;
  let user;
  let adminToken;

  beforeAll(async () => {
    car = await createCarMock();
    user = await createUserMock();
    const admin = await new UserRepository().findByEmail(
      process.env.ADMIN_EMAIL
    );

    adminToken = jwt.sign({ user: admin }, jwtConfig.secretKey, {
      expiresIn: jwtConfig.expiresIn,
    });
  });

  it('should not rent a car with the wrong keys passed on the request body and return http status 400', async () => {
    const response = await request(app).post(`/api/cars/${car.id}`).send({});

    expect(response.statusCode).toBe(400);
  });

  it('should not rent a car without a token and return http status 401', async () => {
    const response = await request(app).post(`/api/cars/${car.id}`).send({
      rentalStartDate: '10/05/2023',
      rentalReturnDate: '15/05/2023',
    });

    expect(response.statusCode).toBe(401);
    expect(response.body).toStrictEqual({
      error: 'Missing authorization token.',
    });
  });

  it('should not rent a car without a customer token and return http status 401', async () => {
    const response = await request(app)
      .post(`/api/cars/${car.id}`)
      .send({
        rentalStartDate: '10/05/2023',
        rentalReturnDate: '15/05/2023',
      })
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(401);
    expect(response.body).toStrictEqual({ error: 'Unauthorized.' });
  });

  it('should rent a car and return http status 200', async () => {
    const response = await request(app)
      .post(`/api/cars/${car.id}`)
      .send({
        rentalStartDate: '10/05/2023',
        rentalReturnDate: '15/05/2023',
      })
      .set('Authorization', `Bearer ${user.userToken}`);

    const responseKeys = Object.keys(response.body);
    const mockKeys = [
      'id',
      'rentalStartDate',
      'rentalReturnDate',
      'returnedCarDate',
      'returnedCar',
      'rentalPricePerDay',
      'rentalPricePreview',
      'rentalPriceTotal',
      'mileageRan',
    ];

    expect(response.statusCode).toBe(200);
    expect(responseKeys.sort()).toStrictEqual(mockKeys.sort());
  });
  it('should not rent an unavailable car and return http status 400', async () => {
    const response = await request(app)
      .post(`/api/cars/${car.id}`)
      .send({
        rentalStartDate: '10/05/2023',
        rentalReturnDate: '15/05/2023',
      })
      .set('Authorization', `Bearer ${user.userToken}`);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      error: 'This car is not available to rent.',
    });
  });

  it('should not rent a car with an invalid id and return http status 404', async () => {
    const response = await request(app)
      .post(`/api/cars/${v4()}`)
      .send({
        rentalStartDate: '10/05/2023',
        rentalReturnDate: '15/05/2023',
      })
      .set('Authorization', `Bearer ${user.userToken}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({
      error: 'Car not found.',
    });
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
