import { expect, describe, it, beforeAll, afterAll } from '@jest/globals';
import { connection } from '../..';
import app from '../../../app';
import request from 'supertest';
import { RentalRepository } from '../../../repositories';

const rentalMock = {
  id: '63ed70b9-691e-4f4b-bb15-e4a8d87632ae',
  rentalStartDate: '2023-05-20T03:00:00.000Z',
  rentalReturnDate: '2023-05-25T03:00:00.000Z',
  returnedCarDate: null,
  returnedCar: false,
  rentalPricePerDay: 60,
  rentalPricePreview: 180,
  rentalPriceTotal: 180,
  mileageRan: 40,
};
beforeAll(async () => {
  await connection.create();

  const rentalToCreate = await new RentalRepository().saveRental(
    rentalMock as any
  );
});

afterAll(async () => {
  await connection.dropTables();
  await connection.close();
});

describe('get one rental information by id', () => {
  it('should retrieve one rental information with admin logged', async () => {
    const requestLoginBody = {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    };

    const response = await request(app)
      .post('/api/users/login')
      .send(requestLoginBody);

    const responseLoginBody = response.body;

    const responseOfGetRentalById = await request(app)
      .get(`/api/rentals/${rentalMock.id}`)
      .set('Authorization', `Bearer ${responseLoginBody.token}`);

    expect(responseOfGetRentalById.statusCode).toBe(200);
    expect(Object.keys(responseOfGetRentalById.body)).toContain('returnedCar');
    expect(Object.keys(responseOfGetRentalById.body)).toContain('mileageRan');
  });

  it('should not retrieve one rental information without admin logged', async () => {
    const responseOfGetRentalById = await request(app).get(
      `/api/rentals/${rentalMock.id}`
    );

    expect(responseOfGetRentalById.statusCode).toBe(401);
    expect(responseOfGetRentalById.body.error).toEqual(
      'Missing authorization token'
    );
  });
});
