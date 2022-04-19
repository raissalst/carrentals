import { describe, it } from '@jest/globals';
import { createCarRentShape } from '../../../shapes';

describe('', () => {
  const correctSchema = {
    rentalStartDate: '20/05/2023',
    rentalReturnDate: '23/05/2023',
  };
  const wrongSchema = {
    rentalStartDate: '20-05-2024',
    rentalReturnDate: '23-05-2024',
  };

  it('should be a valid schema', async () => {
    const result = await createCarRentShape.isValid(correctSchema);
    expect(result).toEqual(true);
  });

  it('should not be a  valid schema, field name is incorrect', async () => {
    const result = await createCarRentShape.isValid(wrongSchema);
    expect(result).toEqual(false);
  });
});
