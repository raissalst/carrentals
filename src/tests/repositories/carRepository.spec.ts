import { CarRepository } from '../../repositories';
import { expect, describe, it, beforeAll, afterAll } from '@jest/globals';
import { connection } from '..';
jest.setTimeout(30000);

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  // await connection.clearTables();
  // await connection.dropTables();
  // await connection.close();
});

describe('Car repository tests', () => {
  const carMock = {
    id: '563fb10f-084e-4abd-a6f5-09293cd24cbf',
    name: 'voyage',
    model: 'GTS',
    brand: 'VW',
    year: '1991',
    color: 'branco',
    doors: 3,
    fuelType: 'álcool',
    plate: 'LPY78UY',
    gear: 'manual',
    chassis: '3C8FY68B82T297664',
    currentMileage: 856,
    rentalPricePerday: 95.0,
    availableToRent: true,
    isActive: true,
    company: "563fb10f-084e-4abd-a0f5-09293cd24cbf"
  };

  // const carMultipleCarsMock = [
  //   {
  //     id: '563fb10f-084e-4abd-a6f5-09293cd24cbf',
  //     name: 'voyage',
  //     model: 'GTS',
  //     brand: 'VW',
  //     year: '1991',
  //     color: 'branco',
  //     doors: 3,
  //     fuelType: 'álcool',
  //     plate: 'LPY78UY',
  //     gear: 'manual',
  //     chassis: '3C8FY68B82T297664',
  //     currentMileage: 234,
  //     rentalPricePerday: 95.0,
  //   },
  //   {
  //     id: '563fb10f-084e-4abd-a6f5-09293cd24cbf',
  //     name: 'voyage',
  //     model: 'GTS',
  //     brand: 'VW',
  //     year: '1991',
  //     color: 'branco',
  //     doors: 3,
  //     fuelType: 'álcool',
  //     plate: 'LPY78UY',
  //     gear: 'manual',
  //     chassis: '3C8FY68B82T297664',
  //     currentMileage: 856,
  //     rentalPricePerday: 95.0,
  //   },
  // ];

  // it('create car', async () => {
  //   const car = await new CarRepository().saveCar(carMock as any);

  //   expect(car).toBeTruthy();
  //   expect(car).toStrictEqual(carMock);
  // });

  // it('create multiple cars', async () => {
  //   const cars = await new CarRepository().saveMultipleCars(carMock as any);

  //   expect(cars).toBeTruthy();
  //   expect(cars).toStrictEqual(carMock);
  // });

  it('get all cars', async () => {
    const cars = await new CarRepository().getCars();

    expect(cars.length).toBe(0);
  });

  // it('get car by id', async () => {
  //   const car = await new CarRepository().getCarById(carMock.id);

  //   expect(Object.keys(car)).toStrictEqual(Object.keys(carMock));
  // });

  // it('update car', async () => {
  //   const response = await new CarRepository().updateCar(carMock.id as any, {
  //     color: 'vermelho',
  //   });

  //   expect(response.affected).toBe(1);

  //   const car = await new CarRepository().getCarById(carMock.id);

  //   expect(car.color).toStrictEqual('vermelho');
  // });
});
