import { describe, expect, it } from '@jest/globals';
import { updateUserShape } from '../../../shapes';

describe('user update shape tests', () => {
  const schemaRight = {
    name: 'novo nome',
    phone: '55976885423',
    cpf: '119.987.647-03',
  };

  const schemaWrong = {
    cpf: '11987648309',
  };

  it('should be a valid schema', async () => {
    const result = await updateUserShape.isValid(schemaRight);
    expect(result).toEqual(true);
  });
  it('should not be a valid schema with cpf in wrong format', async () => {
    const result = await updateUserShape.isValid(schemaWrong);
    expect(result).toEqual(false);
  });
});
