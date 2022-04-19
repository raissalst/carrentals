import dotenv from 'dotenv';
import path from 'path';
import { ConnectionOptions, createConnection, getConnection } from 'typeorm';

dotenv.config();

const testConfig = {
  type: 'postgres',
  url: process.env.TESTS_DATABASE_URL,
  logging: false,
  ssl: { rejectUnauthorized: false },
  entities: [path.join(__dirname, '../entities/**/*.*')],
  migrations: [path.join(__dirname, '../migrations/**/*.*')],
  cli: {
    entitiesDir: path.join(__dirname, '../entities'),
    migrationsDir: path.join(__dirname, '../migrations'),
  },
  migrationsRun: true,
  dropSchema: true,
} as ConnectionOptions;

const connection = {
  create: async () => {
    await createConnection(testConfig)
      .then(() => console.log('database conected'))
      .catch((err) => console.log(err));
  },

  close: async () => {
    await getConnection().close();
  },

  clearTables: async () => {
    const entities = getConnection().entityMetadatas;
    for (const entity of entities) {
      const repository = await getConnection().getRepository(entity.name);
      await repository.query(
        `TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`
      );
    }
  },

  dropTables: async () => {
    const entities = getConnection().entityMetadatas;
    for (const entity of entities) {
      const repository = await getConnection().getRepository(entity.name);
      await repository.query(`DROP TABLE ${entity.tableName} CASCADE;`);
    }
  },
};

export { connection };
