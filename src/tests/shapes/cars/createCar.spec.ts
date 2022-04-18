import { describe, expect, it } from '@jest/globals';
import { createCarShape } from '../../../shapes';

describe('verify user update shape', () => {
  const schemaRight = {
    cars:[
        {
            name: "voyage",
            model: "GTS",
            brand: "VW",
            year: "1991",
            color: "branco",
            doors: 2,
            fuelType: "alcool",
            plate: "LPY78UY",
            gear: "automatico",
            chassis: "3C8FY68B82T297664",
            currentMileage: 856,		
            rentalPricePerday: 95.00,
        }
    ]
  };

  const schemaWrong = {
    cars:[
        {
            name: "voyage",
            model: "GTS",
            brand: "VW",
            year: "1991",
            color: "branco",
        }
    ]
  };

  it('should be a valid schema', async () => {
    const result = await createCarShape.isValid(schemaRight);
    expect(result).toEqual(true);
  });
  it('should not be a valid schema without some required fields', async () => {
    const result = await createCarShape.isValid(schemaWrong);
    expect(result).toEqual(false);
  });
});
