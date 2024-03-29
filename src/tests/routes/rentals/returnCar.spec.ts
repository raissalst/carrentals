import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import app from '../../../app';
import request from 'supertest';
import {
  UserRepository,
  CarRepository,
  RentalRepository,
} from '../../../repositories';
import { connection } from '../..';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import { User } from '../../../entities/User';
import { jwtConfig } from '../../../configs';
import { Car } from '../../../entities/Car';
import { Rental } from '../../../entities/Rental';

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.dropTables();
  await connection.close();
});

describe('Return car route tests', () => {
  let adminToken: string;
  let companyToken: string;
  let user: User;
  let company: User;
  let car: Car;
  let rental: Rental;

  beforeAll(async () => {
    const mock = await createMock();

    const admin = await new UserRepository().findByEmail(
      process.env.ADMIN_EMAIL
    );

    adminToken = jwt.sign({ user: admin }, jwtConfig.secretKey, {
      expiresIn: jwtConfig.expiresIn,
    });

    companyToken = jwt.sign({ user: mock.company }, jwtConfig.secretKey, {
      expiresIn: jwtConfig.expiresIn,
    });

    company = mock.company;
    user = mock.user;
    car = mock.car[0];
    rental = mock.rental;
  });

  it('should not return a car when company is not the owner of the car and return http status 401', async () => {
    const companyMock = {
      id: v4(),
      name: 'Company',
      email: 'company@gmail.com',
      password: '1234',
      phone: '21997771234',
      userType: 'empresa',
      cnpj: '12.788.702/0001-22',
      cpf: null,
      isActive: true,
      addressId: v4(),
    };

    const otherCompany = await new UserRepository().saveUser(
      companyMock as any
    );

    const token = jwt.sign({ user: otherCompany }, jwtConfig.secretKey, {
      expiresIn: jwtConfig.expiresIn,
    });

    const response = await request(app)
      .post(`/api/rentals/${rental.id}`)
      .send({ mileageRan: 50 })
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(401);
    expect(response.body).toStrictEqual({
      error: "Unauthorized. Company doesn't own this car.",
    });
  });

  it('should return a car and return http status 200', async () => {
    const response = await request(app)
      .post(`/api/rentals/${rental.id}`)
      .send({ mileageRan: 50 })
      .set('Authorization', `Bearer ${companyToken}`);

    const { returnedCar, rentalPriceTotal, mileageRan } = response.body;
    expect(response.statusCode).toBe(200);
    expect(returnedCar).toBe(true);
    expect(rentalPriceTotal).toBe(360);
    expect(mileageRan).toBe(50);

    const updatedCar = await new CarRepository().getCarById(car.id);

    expect(updatedCar.availableToRent).toBe(true);
  });
  it('should not return a car without a car id existing on the database and return http status 404', async () => {
    const response = await request(app)
      .post(`/api/rentals/${v4()}`)
      .send({ mileageRan: 50 })
      .set('Authorization', `Bearer ${companyToken}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({ error: 'Rental not found.' });
  });

  it('should not return a car whose rental has already been finished and return http status 400', async () => {
    const response = await request(app)
      .post(`/api/rentals/${rental.id}`)
      .send({ mileageRan: 50 })
      .set('Authorization', `Bearer ${companyToken}`);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      error: 'This rental has already been finished.',
    });
  });
  it('should not return a car with an invalid id and return http status 400', async () => {
    const response = await request(app)
      .post(`/api/rentals/asdf456`)
      .send({ mileageRan: 50 })
      .set('Authorization', `Bearer ${companyToken}`);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      error: 'Id must be UUID.',
    });
  });

  it('should not return a car without a token and return http status 401', async () => {
    const response = await request(app)
      .post(`/api/rentals/${rental.id}`)
      .send({ mileageRan: 50 });

    expect(response.statusCode).toBe(401);
  });

  it('should not return a car with an admin token and return http status 401', async () => {
    const response = await request(app)
      .post(`/api/rentals/${rental.id}`)
      .send({ mileageRan: 50 })
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(401);
  });

  it('should not return a car with a deactivated company logged and return http status 200', async () => {
    const mock = await desactiveCompanyMock(company, car, user);
    const response = await request(app)
      .post(`/api/rentals/${mock.rental.id}`)
      .send({ mileageRan: 50 })
      .set('Authorization', `Bearer ${mock.updatedCompanyToken}`);

    expect(response.statusCode).toBe(200);

    const updatedCar = await new CarRepository().getCarById(car.id);

    expect(updatedCar.availableToRent).toBe(false);
  });
});

const createMock = async () => {
  const userMock = {
    id: v4(),
    name: 'Jhon Doe',
    email: 'jhon@mail.com',
    password: '1234',
    cpf: '123.123.123-12',
    cnpj: null,
    phone: '1191234-1234',
    userType: 'cliente',
    isActive: true,
    addressId: v4(),
  };

  const user = await new UserRepository().saveUser(userMock as any);

  const companyMock = {
    id: v4(),
    name: 'Company One',
    email: 'companyone@gmail.com',
    password: '1234',
    phone: '21997771234',
    userType: 'empresa',
    cnpj: '29.788.702/0001-22',
    cpf: null,
    isActive: true,
    addressId: v4(),
  };

  const company = await new UserRepository().saveUser(companyMock as any);

  const carMock = [
    {
      id: v4(),
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
      availableToRent: false,
      isActive: true,
      company: companyMock.id,
    },
  ];

  const car = await new CarRepository().saveMultipleCars(carMock as any);

  let date = new Date();
  date.setDate(date.getDate() - 5);

  const rentalMock = {
    id: v4(),
    rentalStartDate: date,
    rentalReturnDate: new Date(),
    returnedCarDate: null,
    returnedCar: false,
    rentalPricePerDay: 60,
    rentalPricePreview: 360,
    rentalPriceTotal: 0,
    mileageRan: 0,
    customer: user.id,
    car: car[0].id,
  };

  const rental = await new RentalRepository().saveRental(rentalMock as any);

  return {
    user,
    company,
    car,
    rental,
  };
};

const desactiveCompanyMock = async (company, car, user) => {
  let date = new Date();
  date.setDate(date.getDate() - 5);

  await new UserRepository().updateUser({ isActive: false }, company.id);
  const updatedCompany = await new UserRepository().findById(company.id);
  await new CarRepository().updateCar(car.id, {
    availableToRent: false,
    isActive: false,
  });

  const updatedCompanyToken = jwt.sign(
    { user: updatedCompany },
    jwtConfig.secretKey,
    {
      expiresIn: jwtConfig.expiresIn,
    }
  );

  const newRentalMock = {
    id: v4(),
    rentalStartDate: date,
    rentalReturnDate: new Date(),
    returnedCarDate: null,
    returnedCar: false,
    rentalPricePerDay: 60,
    rentalPricePreview: 360,
    rentalPriceTotal: 0,
    mileageRan: 0,
    customer: user.id,
    car: car.id,
  };

  const newRental = await new RentalRepository().saveRental(
    newRentalMock as any
  );

  return {
    rental: newRental,
    updatedCompanyToken,
  };
};
