import { Rental } from '../../entities/Rental';
import { getRepository, Repository, UpdateResult } from 'typeorm';

interface IRentalFilters {
  returnedCar?: boolean;
}

interface IRentalUpdateData {
  returnedCarDate: Date;
  returnedCar: boolean;
  rentalPriceTotal: number;
  mileageRan: number;
}

interface IRentalRepo {
  getAllRental: (
    query: Array<IRentalFilters> | IRentalFilters
  ) => Promise<Rental[]>;
  getRentalById: (id: string) => Promise<Rental>;
  saveRental: (rentalData: Rental) => Promise<Rental>;
  updateRental: (
    id: string,
    updateData: IRentalUpdateData
  ) => Promise<UpdateResult>;
  findRentalCar: (id: string) => Promise<Rental>;
  findRentals: (id: string, query: boolean) => Promise<Rental[]>;
}

class RentalRepository implements IRentalRepo {
  private ormRepo: Repository<Rental>;

  constructor() {
    this.ormRepo = getRepository(Rental);
  }

  getAllRental = async (query: IRentalFilters | IRentalFilters[] = {}) =>
    await this.ormRepo.find({ where: query });

  getRentalById = async (id: string) => await this.ormRepo.findOne({ id });

  saveRental = async (rentalData: Rental) =>
    await this.ormRepo.save(rentalData);

  updateRental = async (id: string, updateData: IRentalUpdateData) =>
    await this.ormRepo.update({ id }, updateData);

  findRentalCar = async (id: string) =>
    await this.ormRepo
      .createQueryBuilder('rental')
      .leftJoinAndSelect('rental.car', 'car')
      .where({ id })
      .getOne();
  findRentals = async (id: string, query?: boolean) =>
    await this.ormRepo
      .createQueryBuilder('rentals')
      .leftJoinAndSelect('rentals.car', 'car')
      .where(query !== undefined ? 'rentals.returnedCar =:returnedCar' : '', {
        returnedCar: query,
      })
      .andWhere({ customer: id })
      .getMany();
}

export { RentalRepository, IRentalRepo, IRentalFilters, IRentalUpdateData };
