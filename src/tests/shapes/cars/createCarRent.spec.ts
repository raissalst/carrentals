import { describe, it } from '@jest/globals';
import { createCarRentShape } from '../../../shapes';

describe('', () => {
  const correctSchema = {
    rentalStartDate: '10/05/2023',
    rentalReturnDate: '15/05/2023',
  };
  const wrongSchema = {
    rentalStartData: '10/05/2023',
    rentalReturnData: '15/05/2023',
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
