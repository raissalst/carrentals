import { expect, describe, it, beforeAll, afterAll } from '@jest/globals';
import { connection } from '..';
import { RentalRepository } from '../../repositories';
import { v4 } from 'uuid';

describe('rental reposiotory tests', () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.dropTables();
    await connection.close();
  });
  const rentalMock = {
    id: v4(),
    rentalStartDate: new Date(),
    rentalReturnDate: new Date(),
    returnedCarDate: null,
    returnedCar: false,
    rentalPricePerDay: 100,
    rentalPricePreview: 500,
    rentalPriceTotal: 0,
    mileageRan: 0,
    customerId: v4(),
    carId: v4(),
  };

  const rentalMock2 = {
    id: v4(),
    rentalStartDate: new Date(),
    rentalReturnDate: new Date(),
    returnedCarDate: null,
    returnedCar: true,
    rentalPricePerDay: 100,
    rentalPricePreview: 500,
    rentalPriceTotal: 0,
    mileageRan: 0,
    customerId: v4(),
    carId: v4(),
  };

  it('create rental', async () => {
    const rental = await new RentalRepository().saveRental(rentalMock as any);

    expect(rental).toBeTruthy();
    expect(rental).toStrictEqual(rentalMock);
  });

  it('get all rentals', async () => {
    const rental = await new RentalRepository().getAllRental();

    expect(rental).toBeTruthy();
    expect(rental.length).toBe(1);
  });

  it('get rentals with filter', async () => {
    const newRental = await new RentalRepository().saveRental(
      rentalMock2 as any
    );

    const rental = await new RentalRepository().getAllRental({
      returnedCar: true,
    });

    expect(rental).toBeTruthy();
    expect(rental.length).toBe(1);
    expect(rental[0].returnedCar).toStrictEqual(true);
  });

  it('get rentals by id', async () => {
    const rental = await new RentalRepository().getRentalById(rentalMock.id);

    expect(rental).toBeTruthy();
    expect(rental.id).toStrictEqual(rentalMock.id);
  });

  it('update rental', async () => {
    const updateData = await new RentalRepository().updateRental(
      rentalMock.id,
      {
        returnedCarDate: new Date(),
        returnedCar: true,
        rentalPriceTotal: 500,
        mileageRan: 100,
      }
    );

    expect(updateData.affected).toBe(1);

    const rental = await new RentalRepository().getRentalById(rentalMock.id);

    expect(rental.returnedCar).toStrictEqual(true);
    expect(rental.rentalPriceTotal).toBe(500);
    expect(rental.mileageRan).toBe(100);
  });
});
