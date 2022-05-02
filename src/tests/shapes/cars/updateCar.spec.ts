import { describe, expect, it } from '@jest/globals';
import updateCarShape from '../../../shapes/cars/updateCar.shape';

describe('car update shape tests', () => {
  const schemaRight = {
    name: 'Gol',
    model: 'bolinha',
    brand: 'Volkswagen',
    year: '1995',
    color: 'vermelho',
    doors: 2,
    fuelType: 'alcool',
    plate: 'ABC1234',
    gear: 'manual',
    chassis: '3D8XW68F95A285324',
    currentMileage: 1000,
    rentalPricePerDay: 89.0,
    availableToRent: true,
    isActive: true,
  };

  const schemaWrong = {
    rentalPricePerDay: '',
  };

  it('should be a valid schema', async () => {
    const result = await updateCarShape.isValid(schemaRight);
    expect(result).toEqual(true);
  });
  it('should not be a valid schema with a field not null', async () => {
    const result = await updateCarShape.isValid(schemaWrong);
    expect(result).toEqual(false);
  });
});
