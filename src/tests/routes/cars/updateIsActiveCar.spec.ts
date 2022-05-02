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

describe('Update isActive car route tests', () => {
  const companyMock = {
    name: 'Company One',
    email: 'companyone@gmail.com',
    password: '1234',
    phone: '21997771234',
    userType: 'empresa',
    cnpj: '29.788.702/0001-22',
    address: 'Rua da passagem, 20',
    city: 'Petrópolis',
    state: 'RJ',
    country: 'Brasil',
  };

  const carMock = {
    cars: [
      {
        name: 'Audi',
        model: 'A3',
        brand: 'Audi',
        year: '2005',
        color: 'cinza',
        doors: 4,
        fuelType: 'gasolina',
        plate: 'LVU7Y65',
        gear: 'automatico',
        chassis: '3C8FY68B82T297664',
        currentMileage: 20,
        rentalPricePerDay: 955.0,
      },
    ],
  };

  it('should not disable a car for rental without a token and return http status 401', async () => {
    const createResponse = await request(app)
      .post('/api/users')
      .send(companyMock);

    const responseCompanyBody = createResponse.body;

    const requestBody = {
      email: companyMock.email,
      password: companyMock.password,
    };

    const response = await request(app)
      .post('/api/users/login')
      .send(requestBody);

    const responseBody = response.body;
    const companyToken = responseBody.token;

    const responseOfCar = await request(app)
      .post('/api/cars')
      .send(carMock)
      .set('Authorization', `Bearer ${companyToken}`);

    const responseOfDelete = await request(app).delete(
      `/api/cars/${responseOfCar.body[0].id}`
    );

    expect(responseOfDelete.statusCode).toBe(401);
  });

  it('should disable a car for rental with a token of the company that owns the car and return http status 204', async () => {
    const requestBody = {
      email: companyMock.email,
      password: companyMock.password,
    };

    const response = await request(app)
      .post('/api/users/login')
      .send(requestBody);
    const responseBody = response.body;
    const companyToken = responseBody.token;

    const responseOfCar = await request(app)
      .post('/api/cars')
      .send(carMock)
      .set('Authorization', `Bearer ${companyToken}`);

    const responseOfDelete = await request(app)
      .delete(`/api/cars/${responseOfCar.body[0].id}`)
      .set('Authorization', `Bearer ${companyToken}`);

    expect(responseOfDelete.statusCode).toBe(204);
  });
});
