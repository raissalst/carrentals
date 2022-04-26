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

describe('get users rentals', () => {
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

  const mockRental = {    
    "rentalStartDate": "10/05/2022",
    "rentalReturnDate": "15/05/2022",
  }
})
