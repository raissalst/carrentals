import { CarRepository } from '../../repositories';
import { expect, describe, it, beforeAll, afterAll } from '@jest/globals';
import { v4 } from 'uuid';
import { connection } from '..';

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.dropTables();
  await connection.close();
});

describe('Car repository tests', () => {
  const carMock = {
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
    companyId: '563fb10f-084e-4abd-a0f5-09293cd24cbf',
  };

  const carMultipleCarsMock = [
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
      companyId: '563fb10f-084e-4abd-a0f5-09293cd24cbf',
    },
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
      chassis: '3C8FY68B81T297664',
      currentMileage: 856,
      rentalPricePerDay: 95.0,
      availableToRent: true,
      isActive: true,
      companyId: '563fb15f-084e-4abd-a0f5-09293cd24cbf',
    },
  ];

  it('should create a car', async () => {
    const car = await new CarRepository().saveCar(carMock as any);

    expect(car).toBeTruthy();
    expect(car).toStrictEqual(carMock);
  });

  it('should create multiple cars', async () => {
    const cars = await new CarRepository().saveMultipleCars(
      carMultipleCarsMock as any
    );

    expect(cars).toBeTruthy();
    expect(cars).toHaveLength(2);
  });

  it('should get all cars', async () => {
    const cars = await new CarRepository().getCars();

    expect(cars.length).toBe(3);
  });

  it('should get a car by id', async () => {
    const car = await new CarRepository().getCarById(carMock.id);
    const { companyId, ...carWithoutCompanyId } = carMock;
    const carKeys = Object.keys(car);
    const companyIndex = carKeys.indexOf('company');
    carKeys.splice(companyIndex, 1);
    const carKeysMock = Object.keys(carWithoutCompanyId);

    expect(car.id).toBe(carMock.id);
    expect(carKeys.sort()).toEqual(carKeysMock.sort());
  });

  it('should update a car', async () => {
    const response = await new CarRepository().updateCar(carMock.id as any, {
      color: 'vermelho',
    });

    expect(response.affected).toBe(1);

    const car = await new CarRepository().getCarById(carMock.id);

    expect(car.color).toStrictEqual('vermelho');
  });
});
