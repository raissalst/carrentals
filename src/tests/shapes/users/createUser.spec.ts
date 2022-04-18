import { describe, expect, it } from '@jest/globals';
import { createUserShape } from '../../../shapes'

describe('verify create user shape', () => {
    const schemaRight = {
      name: 'seu nome',
      email: 'mail@mail.com',
      password: '123456',
      phone: '55976885423',
      cpf: '123.456.789-10',
      userType: 'cliente',
      isAdmin: false,
    };
  
    const schemaWrong = {
      cpf: '12345678910',
    };
  
    it('should be a valid schema', async () => {
      const result = await createUserShape.isValid(schemaRight);
      expect(result).toEqual(true);
    });
    it('should not be a valid schema with cpf in wrong format', async () => {
      const result = await createUserShape.isValid(schemaWrong);
      expect(result).toEqual(false);
    });
  });
  