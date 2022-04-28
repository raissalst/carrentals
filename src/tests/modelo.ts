import { beforeAll, describe, expect, it } from '@jest/globals';
import request from 'supertest';
import app from '../app';
import { connection } from './index';
import v4 from 'uuid';

// cria a conexão com o db de testes antes de todos os testes desse arquivo
beforeAll(async () => {
  await connection.create();
});

// limpa e exclui as tabelas e depois fecha a conexão com o banco após todos os testes
afterAll(async () => {
  await connection.clearTables();
  await connection.dropTables();
  await connection.close();
});

// executada antes de cada teste
beforeEach(async () => {});

// executada depois de cada teste
afterEach(async () => {});

// função de exemplo para mokar um token válido
const admLogin = async () => {
  const UserMock = {
    username: 'admin',
    password: '1234',
  };

  const loginResponse = await request(app).post('/users/login').send(UserMock);
  return loginResponse.body.accessToken;
};

// describe('testes de modelo', () => {
/*

  it('teste de rota simples', async () => {
    const requestBody = {
      email: 'user@mail.com',
      password: '1234',
    };

    const response = await request(app)
      .post('/api/users/login')
      .send(requestBody);
    const responseBody = response.body;
    expect(response.statusCode).toBe(200);
    expect(typeof responseBody).toBe('object');
    expect(responseBody.token).toBeTruthy();
  });

  it('teste de rota com header', async () => {
    const token = await admLogin();

    const response = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);
    const responseBody = response.body;

    expect(response.statusCode).toBe(200);
    expect(typeof responseBody).toBe('object');
  });  
  
  it('teste de um Repository', async () => {
    const requestBody = {
      uuid: v4,
      email: 'user@mail.com',
      password: '1234',
      isAdm: false,
    };
    const newUser = await new UserRepository().createUser(requestBody)
    
    expect(newUser).toBeTruthy()
  })

  */
// });
