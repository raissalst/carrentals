import { expect, describe, it, beforeAll, afterAll } from '@jest/globals';
import { connection } from '../..';
import app from '../../../app';
import { v4 } from 'uuid';
import request from 'supertest';
import { CarRepository } from '../../../repositories';

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.dropTables();
  await connection.close();
});

describe('should retrieve all active and available cars', () => {
  it('200, get all cars', async () => {
    const car = await createCar();

    const response = await request(app).get('/api/cars');

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(car.body);
  });
  
  it('get no cars when there are not cars availables or actives', async () => {
    const response = await request(app).get(
      '/api/cars');
      
      expect(response.badRequest).toBe(400);
      expect(response.body).toHaveLength(0);
  });
});

const createCar = async () => {
  const carMock = [
    {
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
    },
  ];

  const resp = await new CarRepository().saveCar(carMock as any);

  return resp[0];
};


// - [GET] → *visualizar dados públicos (tudo menos placa, chassis, km e isActive) de todos os carros disponíveis (available=true e active=true) cadastrados na plataforma (autorização para admin, empresa e cliente)🔒*