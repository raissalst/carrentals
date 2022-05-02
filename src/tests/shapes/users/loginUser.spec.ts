import { describe, expect, it } from '@jest/globals';
import { loginUserShape } from '../../../shapes';

describe('login user shape tests', () => {
  const correctSchema = {
    email: 'user@mail.com',
    password: '1234',
  };
  const wrongSchema = {
    email: 'user',
    password: '1234',
  };
  const wrongSchema2 = {
    email: 'user@mail.com',
  };

  it('should be a valid schema', async () => {
    const result = await loginUserShape.isValid(correctSchema);
    expect(result).toEqual(true);
  });
  it('should not be a valid schema when email sent is not a valid email type', async () => {
    const result = await loginUserShape.isValid(wrongSchema);
    expect(result).toEqual(false);
  });
  it('should not be a valid schema without field password', async () => {
    const result = await loginUserShape.isValid(wrongSchema2);
    expect(result).toEqual(false);
  });
});
