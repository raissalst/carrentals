import { expect, describe, it, beforeAll, afterAll } from '@jest/globals';
import { connection } from '../..';
import app from '../../../app';
import request from 'supertest';
import {
  CarRepository,
  RentalRepository,
  UserRepository,
} from '../../../repositories';
import { v4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../../configs';
import { User } from '../../../entities/User';
import { Rental } from '../../../entities/Rental';

let companyToken: string;
let customerToken: string;
let rentalsOpen: Rental;
let rentalsClose: Rental;
let userCustomer: User;
let rentals2: Rental;
let userCompany: User;
let user: User;
afterAll(async () => {
  await connection.dropTables();
  await connection.close();
});

describe('Get users rentals route tests', () => {
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

  const mockCar = {
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
  };

  const companyMock = {
    id: v4(),
    name: 'Company SA',
    email: 'companysa@gmail.com',
    password: '123456',
    phone: '21997771234',
    userType: 'empresa',
    cnpj: '29.594.702/0001-22',
    addressId: v4(),
  };

  const mockRental = {
    id: v4(),
    rentalStartDate: '2021-10-05T03:00:00.000Z',
    rentalReturnDate: '2021-10-07T03:00:00.000Z',
    returnedCar: false,
    rentalPricePerDay: 95.0,
    rentalPricePreview: 475.0,
    rentalPriceTotal: 0.0,
    mileageRan: 0,
    customer: userMock.id,
    car: mockCar.id,
  };

  const mockRentalCompany = {
    id: v4(),
    rentalStartDate: '2021-10-05T03:00:00.000Z',
    rentalReturnDate: '2021-10-07T03:00:00.000Z',
    returnedCar: false,
    rentalPricePerDay: 95.0,
    rentalPricePreview: 475.0,
    rentalPriceTotal: 0.0,
    mileageRan: 0,
    customer: companyMock.id,
    car: mockCar.id,
  };

  beforeAll(async () => {
    await connection.create();

    userCustomer = await new UserRepository().saveUser(userMock as any);
    userCompany = await new UserRepository().saveUser(companyMock as any);
    const car = await new CarRepository().saveCar(mockCar as any);
    rentalsOpen = await new RentalRepository().saveRental(mockRental as any);

    mockRental.returnedCar = true;
    mockRental.id = v4();
    rentalsClose = await new RentalRepository().saveRental(mockRental as any);
    rentals2 = await new RentalRepository().saveRental(
      mockRentalCompany as any
    );
  });

  it('should retrieve a customer rentals and return http status 200', async () => {
    user = userCustomer;
    customerToken = jwt.sign({ user }, jwtConfig.secretKey, {
      expiresIn: jwtConfig.expiresIn,
    });

    const response = await request(app)
      .get('/api/users/profile/rentals')
      .set('Authorization', `Bearer ${customerToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body[0].id).toEqual(rentalsOpen.id);
  });

  it('should retrieve a company rentals and return http status 200', async () => {
    user = userCompany;
    companyToken = jwt.sign({ user }, jwtConfig.secretKey, {
      expiresIn: jwtConfig.expiresIn,
    });

    const response = await request(app)
      .get('/api/users/profile/rentals')
      .set('Authorization', `Bearer ${companyToken}`);
    expect(response.statusCode).toBe(200);
    expect(response.body[0].id).toEqual(rentals2.id);
  });

  it('should not retrieve rentals without a token and return http status 401', async () => {
    const response = await request(app)
      .get('/api/users/profile/rentals')
      .set('Authorization', `Bearer`);
    expect(response.statusCode).toBe(401);
    expect(response.body).toMatchObject({
      error: 'Missing authorization token.',
    });
  });

  it('should list opened rentals by returnedCar query passed as false and return http status 200', async () => {
    user = userCustomer;
    customerToken = jwt.sign({ user }, jwtConfig.secretKey, {
      expiresIn: jwtConfig.expiresIn,
    });

    const response = await request(app)
      .get('/api/users/profile/rentals')
      .set('Authorization', `Bearer ${customerToken}`)
      .query('returnedCar=false');

    expect(response.statusCode).toBe(200);
    expect(response.body[0].returnedCar).toStrictEqual(false);
  });
});
