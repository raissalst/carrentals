import { describe, it, expect } from '@jest/globals';
import { returnCarShape } from '../../../shapes';

describe('return car shape tests', () => {
  it('should be a valid schema', async () => {
    const isValid = await returnCarShape.isValid({ mileageRan: 100 });

    expect(isValid).toBe(true);
  });
  it('should not be a valid schema with incorrect key sent', async () => {
    const isValid = await returnCarShape.isValid({ mileangeRan: 100 });

    expect(isValid).toBe(false);
  });
  it('should not be a valid schema with incorrect value sent', async () => {
    const isValid = await returnCarShape.isValid({ mileageRan: -100 });

    expect(isValid).toBe(false);
  });
});
