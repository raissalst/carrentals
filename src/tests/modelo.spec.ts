import { beforeAll, describe, expect, it } from '@jest/globals';
import request from 'supertest';
import app from '../app';
import UserRepository from '../repositories/user';
import { connection } from './index';

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

describe('tested de modelo', () => {
  it('pegar todos os usuarios', async () => {
    // console.log(resp.body);
  });

  // TODO: criar um teste de exemplo de rota
  // TODO: criar um teste de exemplo de Repository
  // TODO: criar um teste de exemplo de rota com autenticação
});
