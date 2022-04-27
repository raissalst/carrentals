import { expect, describe, it, beforeAll, afterAll } from '@jest/globals';
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

describe('Update Car Controller test', () => {
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

  const reqCarMock = {
    cars: [
      {
        model: 'celta',
        brand: 'chevrolet',
      },
    ],
  };

  it('401 try update car without token', async () => {
    const response = await request(app).patch('/api/cars/:id').send(reqCarMock);
    expect(response.statusCode).toBe(401);
  });
  it('204, try update car with correct token', async () => {
    const response = await request(app)
      .patch('/api/cars/e2700f6c-8875-4cc0-b86e-0fd4d375397c')
      .send(reqCarMock)
      .set('Authorization', `Bearer ${company.token}`);

    console.log(response.body);
    expect(response.statusCode).toBe(204);
  });
});

const createCompany = async () => {
  const companyMock = {
    id: v4(),
    name: 'gustavocompany',
    email: 'gustavocompany@gmail.com',
    password: '1234',
    phone: '21997771234',
    userType: 'empresa',
    cpf: '223.147.324-42',
    addressId: v4(),
    cars: [
      {
        isActive: true,
        availableToRent: true,
        rentalPricePerDay: 255,
        currentMileage: 856,
        chassis: '3C8FY68B82T297664',
        gear: 'manual',
        plate: 'LPY78UY',
        fuelType: 'gasolina',
        doors: 4,
        color: 'branco',
        year: '2004',
        brand: 'Jeep',
        model: 'turbo',
        name: 'Renegade',
        company: '5fdddfd6-3c7a-4a6e-a6e4-61b30c2141f3',
        id: 'e2700f6c-8875-4cc0-b86e-0fd4d375397c',
      },
    ],
  };
  const newCompany = await new UserRepository().saveUser(companyMock as any);
  console.log({ nova: newCompany });
  return newCompany;
};
