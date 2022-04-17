import { v4 } from 'uuid';
// import { faker } from '@faker-js/faker';

import bcrypt from 'bcrypt';

const faker = require('faker-br');
const baseURL = '/api';

const generateUser = () => {
  const username = faker.name.firstName().toLowerCase();
  const word = faker.word.adjective();
  const password = bcrypt.hashSync(faker.word.preposition(4), 10);
  const cpf = faker.br.cpf();
  const cnpj = faker.br.cnpj();
  const phone = faker.br.phone();

  return {
    uuid: v4(),
    username,
    email: `${username}@${word}.com`,
    password,
    cpf,
    cnpj,
    phone,
  };
};

export { generateUser, baseURL };