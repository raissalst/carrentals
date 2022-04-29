import { describe, it, beforeAll, afterAll, expect } from '@jest/globals';
import request from 'supertest';
import { connection } from '../..';
import app from '../../../app';
import { v4 } from 'uuid';
import { CarRepository, UserRepository } from '../../../repositories';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../../configs';
import dotenv from 'dotenv';
import { User } from '../../../entities/User';

dotenv.config();

afterAll(async () => {
  await connection.dropTables();
  await connection.close();
});

describe('update isActive users', () => {
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

  let adminToken: string;
  let userToken: string;
  let company: User;
  beforeAll(async () => {
    await connection.create();

    const user = await new UserRepository().saveUser(userMock as any);
    company = await createCompanyMock();
    const admin = await new UserRepository().findByEmail(
      process.env.ADMIN_EMAIL
    );

    adminToken = jwt.sign({ user: admin }, jwtConfig.secretKey, {
      expiresIn: jwtConfig.expiresIn,
    });

    userToken = jwt.sign({ user }, jwtConfig.secretKey, {
      expiresIn: jwtConfig.expiresIn,
    });
  });

  it('401, try to update user without token', async () => {
    const response = await request(app).patch(`/api/users/${userMock.id}`);

    expect(response.statusCode).toBe(401);
  });

  it('204, try to update user with an admin token', async () => {
    const response = await request(app)
      .patch(`/api/users/${userMock.id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(204);
    expect(response.body).toStrictEqual({});

    const user = await new UserRepository().findByEmail(userMock.email);

    expect(user.isActive).toBe(false);
  });

  it('401, try to update user with an user token', async () => {
    const response = await request(app)
      .patch(`/api/users/${userMock.id}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.statusCode).toBe(401);
  });

  it('404, try to update with a wrong user id', async () => {
    const response = await request(app)
      .patch(`/api/users/${v4()}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(404);
  });

  it('204, try to deactivate company with an admin token', async () => {
    const response = await request(app)
      .patch(`/api/users/${company.id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(204);
    expect(response.body).toStrictEqual({});

    const user = await new UserRepository().findUserCars(company.id);

    expect(user[0].isActive).toBe(false);

    user[0].cars.forEach((car) => {
      expect(car.isActive).toBe(false);
      expect(car.availableToRent).toBe(false);
    });
  });

  it('204, try to activate company with an admin token', async () => {
    const response = await request(app)
      .patch(`/api/users/${company.id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(204);
    expect(response.body).toStrictEqual({});

    const user = await new UserRepository().findUserCars(company.id);

    expect(user[0].isActive).toBe(true);
    user[0].cars.forEach((car) => {
      expect(car.isActive).toBe(true);
      expect(car.availableToRent).toBe(true);
    });
  });
});

const createCompanyMock = async () => {
  const companyMock = {
    id: v4(),
    name: 'Car Company',
    email: 'car@mail.com',
    password: '1234',
    cnpj: '20.123.712/0001-12',
    phone: '1191234-1234',
    userType: 'empresa',
    isActive: true,
    addressId: v4(),
  };

  const company = await new UserRepository().saveUser(companyMock as any);

  const carsMock = [
    {
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
      company: company.id,
    },
    {
      id: v4(),
      name: 'gol',
      model: 'GTS',
      brand: 'VW',
      year: '1991',
      color: 'preto',
      doors: 2,
      fuelType: 'alcool',
      plate: 'LPY78UY',
      gear: 'manual',
      chassis: '3C8FY68B81T297664',
      currentMileage: 856,
      rentalPricePerDay: 95.0,
      availableToRent: true,
      isActive: true,
      company: company.id,
    },
  ];

  const cars = await new CarRepository().saveMultipleCars(carsMock as any);

  return company;
};
