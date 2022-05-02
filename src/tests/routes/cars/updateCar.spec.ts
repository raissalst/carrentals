import { expect, describe, it, beforeAll, afterAll } from '@jest/globals';
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

describe('update car route tests', () => {
  let company = {
    token: '',
    data: {},
  };
  let car;
  beforeAll(async () => {
    const companyCreatedCar = await createCompany();
    company.data = companyCreatedCar.company;
    car = companyCreatedCar.car;
    company.token = jwt.sign(
      { user: companyCreatedCar.company },
      jwtConfig.secretKey,
      {
        expiresIn: jwtConfig.expiresIn,
      }
    );
  });

  const reqCarMock = {
    model: 'celta',
    brand: 'chevrolet',
  };
  it('401, should not update a car without token', async () => {
    const response = await request(app)
      .patch(`/api/cars/${car.id}`)
      .send(reqCarMock);
    expect(response.statusCode).toBe(401);
  });
  it('204, should update a car with correct token', async () => {
    const response = await request(app)
      .patch(`/api/cars/${car.id}`)
      .send(reqCarMock)
      .set('Authorization', `Bearer ${company.token}`);

    expect(response.statusCode).toBe(204);
    const updatedCar = await new CarRepository().getCarById(car.id);
    expect(updatedCar.model).toStrictEqual('celta');
    expect(updatedCar.brand).toStrictEqual('chevrolet');
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
  };
  const newCompany = await new UserRepository().saveUser(companyMock as any);

  const carMock = {
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
    company: newCompany.id,
  };
  const newCar = await new CarRepository().saveCar(carMock as any);

  const companyWithCar = {
    company: newCompany,
    car: newCar,
  };
  return companyWithCar;
};
