import { describe, expect, it } from '@jest/globals';
import updateCarShape from '../../../shapes/cars/updateCar.shape';

describe('verify car update shape', () => {
  const schemaRight = {
    currentMileage: 1000,
    rentalPricePerDay: 89,
    availableToRent: true,
    isActive: true
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
