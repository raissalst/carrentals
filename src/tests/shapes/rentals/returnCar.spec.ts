import { describe, it, expect } from '@jest/globals';
import { returnCarShape } from '../../../shapes';

describe('return car shape tests', () => {
  it('try a valid schema', async () => {
    const isValid = await returnCarShape.isValid({ mileageRan: 100 });

    expect(isValid).toBe(true);
  });
  it('try schema with incorrect key', async () => {
    const isValid = await returnCarShape.isValid({ mileangeRan: 100 });

    expect(isValid).toBe(false);
  });
  it('try schema with incorrect value', async () => {
    const isValid = await returnCarShape.isValid({ mileageRan: -100 });

    expect(isValid).toBe(false);
  });
});
