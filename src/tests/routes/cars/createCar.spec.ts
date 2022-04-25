import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { connection } from '../..';
import app from '../../../app';
import request from 'supertest';
import { UserRepository } from '../../../repositories';
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
describe('create car tests', () => {
  let company = {
    token: '',
    data: {},
  };
  beforeAll(async () => {
    const newCompany = await createCompany();
    company.data = newCompany;
    company.token = jwt.sign({ user: newCompany }, jwtConfig.secretKey, {
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
        rentalPricePerday: 95.0,
      },
    ],
  };
  it('201 CREATED, create car success', async () => {
    const response = await request(app)
      .post('/api/cars')
      .send(reqMock)
      .set('Authorization', `Bearer ${company.token}`);

    expect(response.statusCode).toBe(201);
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
