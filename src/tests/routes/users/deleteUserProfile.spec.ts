import { beforeAll, describe, expect, it } from '@jest/globals';
import request from 'supertest';
import app from '../../../app';
import { connection } from '../../index';
import { v4 } from 'uuid';
import { CarRepository, UserRepository } from '../../../repositories';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../../configs';
import dotenv from 'dotenv';

dotenv.config();

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

let userToken: string;
let admin;
beforeAll(async () => {
  await connection.create();

  const user = await new UserRepository().saveUser(userMock as any);

  userToken = jwt.sign({ user }, jwtConfig.secretKey, {
    expiresIn: jwtConfig.expiresIn,
  });
  const adminProfile = await new UserRepository().findByEmail(
    process.env.ADMIN_EMAIL
  );

  const adminToken = jwt.sign({ user: adminProfile }, jwtConfig.secretKey, {
    expiresIn: jwtConfig.expiresIn,
  });
  admin = { adminToken, adminProfile };
});

afterAll(async () => {
  await connection.clearTables();
  await connection.dropTables();
  await connection.close();
});

describe('Testing the delete user profile route', () => {
  it('should set isActive false', async () => {
    const response = await request(app)
      .delete(`/api/users/profile`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.statusCode).toBe(204);
    expect(response.body).toStrictEqual({});

    const user = await new UserRepository().findByEmail(userMock.email);

    expect(user.isActive).toBe(false);
  });

  it('should not delete users without token', async () => {
    const response = await request(app).delete('/api/users/profile');

    expect(response.statusCode).toBe(401);
  });

  it('204, try to delete an admin profile', async () => {
    const response = await request(app)
      .delete(`/api/users/profile`)
      .set('Authorization', `Bearer ${admin.adminToken}`);

    expect(response.statusCode).toBe(204);
    expect(response.body).toStrictEqual({});

    const user = await new UserRepository().findByEmail(
      admin.adminProfile.email
    );

    expect(user.isActive).toBe(false);
  });

  it('204, trying to delete company profile', async () => {
    const company = await createCompanyMock();
    const companyToken = jwt.sign({ user: company }, jwtConfig.secretKey, {
      expiresIn: jwtConfig.expiresIn,
    });
    const response = await request(app)
      .delete(`/api/users/profile`)
      .set('Authorization', `Bearer ${companyToken}`);

    expect(response.statusCode).toBe(204);
    expect(response.body).toStrictEqual({});

    const user = await new UserRepository().findUserCars(company.id);

    expect(user[0].isActive).toBe(false);

    user[0].cars.forEach((car) => {
      expect(car.isActive).toBe(false);
      expect(car.availableToRent).toBe(false);
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
