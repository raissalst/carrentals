import { MigrationInterface, QueryRunner } from 'typeorm';
import dotenv from 'dotenv';
import { hashSync } from 'bcrypt';
dotenv.config();

export class initialCreateAllTables1650219325062 implements MigrationInterface {
  name = 'initialCreateAllTables1650219325062';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "country" character varying NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_usertype_enum" AS ENUM('admin', 'cliente', 'empresa')`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying NOT NULL, "cpf" character varying(14), "cnpj" character varying(18), "phone" character varying NOT NULL, "userType" "public"."users_usertype_enum" NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "addressId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "UQ_a7815967475d0accd76feba8a1e" UNIQUE ("cnpj"), CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "rentals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rentalStartDate" TIMESTAMP NOT NULL, "rentalReturnDate" TIMESTAMP NOT NULL, "returnedCarDate" TIMESTAMP, "returnedCar" boolean NOT NULL DEFAULT false, "rentalPricePerDay" double precision NOT NULL, "rentalPricePreview" double precision NOT NULL, "rentalPriceTotal" double precision NOT NULL DEFAULT '0', "mileageRan" double precision NOT NULL DEFAULT '0', "customerId" uuid, "carId" uuid, CONSTRAINT "PK_2b10d04c95a8bfe85b506ba52ba" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."cars_doors_enum" AS ENUM('2', '3', '4')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."cars_fueltype_enum" AS ENUM('flex', 'hibrido', 'eletrico', 'gasolina', 'diesel', 'alcool')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."cars_gear_enum" AS ENUM('automatico', 'manual')`
    );
    await queryRunner.query(
      `CREATE TABLE "cars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "model" character varying NOT NULL, "brand" character varying NOT NULL, "year" character varying NOT NULL, "color" character varying NOT NULL, "doors" "public"."cars_doors_enum" NOT NULL, "fuelType" "public"."cars_fueltype_enum" NOT NULL, "plate" character varying(7) NOT NULL, "gear" "public"."cars_gear_enum" NOT NULL, "chassis" character varying NOT NULL, "currentMileage" double precision NOT NULL, "rentalPricePerDay" double precision NOT NULL, "availableToRent" boolean NOT NULL DEFAULT true, "isActive" boolean NOT NULL DEFAULT true, "companyId" uuid, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "rentals" ADD CONSTRAINT "FK_c2d7d6dba8d2e356f8017cc8d49" FOREIGN KEY ("customerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "rentals" ADD CONSTRAINT "FK_7e07037bddbd4c16a105cbd904f" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "cars" ADD CONSTRAINT "FK_648f75868518a81e7c885fedb7b" FOREIGN KEY ("companyId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `INSERT INTO "users" ("name", "email", "password", "cpf", "phone", "userType") VALUES ('${
        process.env.ADMIN_NAME
      }', '${process.env.ADMIN_EMAIL}', '${hashSync(
        process.env.ADMIN_PASSWORD,
        10
      )}', '${process.env.ADMIN_CPF}', '${process.env.ADMIN_PHONE}', '${
        process.env.ADMIN_USERTYPE
      }')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cars" DROP CONSTRAINT "FK_648f75868518a81e7c885fedb7b"`
    );
    await queryRunner.query(
      `ALTER TABLE "rentals" DROP CONSTRAINT "FK_7e07037bddbd4c16a105cbd904f"`
    );
    await queryRunner.query(
      `ALTER TABLE "rentals" DROP CONSTRAINT "FK_c2d7d6dba8d2e356f8017cc8d49"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`
    );
    await queryRunner.query(`DROP TABLE "cars"`);
    await queryRunner.query(`DROP TYPE "public"."cars_gear_enum"`);
    await queryRunner.query(`DROP TYPE "public"."cars_fueltype_enum"`);
    await queryRunner.query(`DROP TYPE "public"."cars_doors_enum"`);
    await queryRunner.query(`DROP TABLE "rentals"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_usertype_enum"`);
    await queryRunner.query(`DROP TABLE "addresses"`);
  }
}
