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

describe('get user cars', () => {
  const mockCar = {
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
  };

  const companyMock = {
    name: 'Company SA',
    email: 'companysa@gmail.com',
    password: '123456',
    phone: '21997771234',
    userType: 'empresa',
    cnpj: '29.594.702/0001-22',
    address: 'Rua company, 100',
    city: 'Petrópolis',
    state: 'RJ',
    country: 'Brasil',
  };

  it('should retrieve company cars', async () => {
    const reqCarBody = mockCar;
    const reqCompanyBody = companyMock;

    const createResponse = await request(app)
      .post('/api/users')
      .send(reqCompanyBody);

    const loginRequestBody = {
      email: companyMock.email,
      password: companyMock.password,
    };

    const response = await request(app)
      .post('/api/users/login')
      .send(loginRequestBody);
    const responseBody = response.body;

    const carRes = await request(app)
      .post('/api/cars')
      .set('Authorization', `Bearer ${responseBody.token}`)
      .send({ cars: [reqCarBody] });

    const userCars = await request(app)
      .get('/api/users/profile/cars')
      .set('Authorization', `Bearer ${responseBody.token}`);

    expect(userCars.statusCode).toBe(200);
    expect(userCars.body).toBeTruthy();
    expect(Object.keys(userCars.body[0])).toContain('name');
  });

  it('should not retrieve the cars list without bearer token', async () => {
    const userCars = await request(app).get('/api/users/profile/cars');

    expect(userCars.statusCode).toBe(401);
    expect(userCars.body).toMatchObject({
      error: 'Missing authorization token',
    });
  });

  it('should not retrieve the cars list if not requested by a company', async () => {
    const requestBody = {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    };

    const response = await request(app)
      .post('/api/users/login')
      .send(requestBody);
    const responseBody = response.body;

    const mockToken = responseBody.token;

    const userCars = await request(app)
      .get('/api/users/profile/cars')
      .set('Authorization', `Bearer ${mockToken}`);
    expect(userCars.statusCode).toBe(401);
    expect(userCars.body).toMatchObject({ error: 'Unauthorized' });
  });

  it('should filter cars in the list by true availability', async () => {
    const loginRequestBody = {
      email: companyMock.email,
      password: companyMock.password,
    };

    const response = await request(app)
      .post('/api/users/login')
      .send(loginRequestBody);
    const responseBody = response.body;

    const userCars = await request(app)
      .get('/api/users/profile/cars')
      .set('Authorization', `Bearer ${responseBody.token}`)
      .query('availableToRent=true');

    expect(userCars.statusCode).toBe(200);
    expect(userCars.body[0].availableToRent).toStrictEqual(true);
  });
});
