import { Repository, getRepository, UpdateResult } from 'typeorm';
import { Car } from '../../entities/Car';

interface ICarData {
  name?: string;
  model?: string;
  brand?: string;
  year?: string;
  color?: string;
  doors?: 2 | 3 | 4;
  fuelType?: 'flex' | 'hibrido' | 'eletrico' | 'gasolina' | 'diesel' | 'alcool';
  plate?: string;
  gear?: 'automatico' | 'manual';
  chassis?: string;
  currentMileage?: number;
  availableToRent?: boolean;
  isActive?: boolean;
  rentalPricePerDay?: number;
}

interface ICarRepo {
  saveCar: (car: Car) => Promise<Car>;
  saveMultipleCars: (cars: Car[]) => Promise<Car[]>;
  getCarById: (id: string) => Promise<Car>;
  getCars: (params?: ICarData) => Promise<Car[]>;
  updateCar: (id: string, updatedData: ICarData) => Promise<UpdateResult>;
  updateIsActive: (
    companyId: string,
    updateTo: boolean
  ) => Promise<UpdateResult>;
}

class CarRepository implements ICarRepo {
  private ormRepository: Repository<Car>;

  constructor() {
    this.ormRepository = getRepository(Car);
  }

  saveCar = async (car: Car) => await this.ormRepository.save(car);

  saveMultipleCars = async (cars: Car[]) => await this.ormRepository.save(cars);

  getCarById = async (id: string) =>
    await this.ormRepository
      .createQueryBuilder('car')
      .leftJoinAndSelect('car.company', 'company')
      .where({ id: id })
      .getOne();

  getCars = async (params: ICarData = {}) =>
    await this.ormRepository.find({ where: params });

  updateCar = async (id: string, updatedData: ICarData) =>
    await this.ormRepository.update({ id }, updatedData);

  updateIsActive = async (companyId, updateTo) =>
    await this.ormRepository.update(
      { company: companyId },
      { isActive: updateTo, availableToRent: updateTo }
    );
}

export { CarRepository, ICarRepo, ICarData };
