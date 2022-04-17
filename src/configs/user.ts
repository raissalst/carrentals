// import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import dotenv from 'dotenv';

const faker = require('faker-br');
dotenv.config();

const USERS = [];
for (let i = 0; i < 10; i += 1) {
  const username = faker.name.firstName().toLowerCase();
  const word = faker.word.adjective();
  const password = bcrypt.hashSync(faker.word.preposition(4), 10);
  const cpf = faker.br.cpf();
  const cnpj = faker.br.cnpj();
  const phone = faker.br.phone();


  USERS.push({
    uuid: v4(),
    username,
    email: `${username}@${word}.com`,
    password,
    cpf,
    cnpj,
    phone,
  });
}

export default USERS;