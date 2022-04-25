import { Repository, getRepository, UpdateResult } from 'typeorm';
import { Car } from '../../entities/Car';

interface ICarData {
  name?: string;
  model?: string;
  brand?: string;
  year?: string;
  color?: string;
  doors?: 2 | 3 | 4;
  fuelType?: 'flex' | 'hibrido' | 'eletrico' | 'gasolina' | 'diesel' | 'alcool'
  plate?: string;
  gear?: 'automatico' | 'manual'
  chassis?: string;
  currentMileage?: number;
  availableToRent?: boolean;
  isActive?: boolean;
  rentalPricePerDay?: number;
}

interface ICarRepo {
  saveCar: (Car: Car) => Promise<Car>;
  saveMultipleCars: (cars: Car[]) => Promise<any>;
  getCarById: (id: string) => Promise<Car>;
  getCars: (params?: ICarData) => Promise<Car[]>;
  updateCar: (id: string, updatedData: ICarData) => Promise<UpdateResult>;
}

class CarRepository implements ICarRepo {
  private ormRepository: Repository<Car>;

  constructor() {
    this.ormRepository = getRepository(Car);
  }

  saveCar = async (Car: Car) => await this.ormRepository.save(Car);
  
  saveMultipleCars = async (cars: Car[]) =>
    await this.ormRepository
      .createQueryBuilder()
      .insert()
      .values(cars)
      .returning(["*"])
      .execute()     
      .then((cars) => cars.generatedMaps);    
    
  getCarById = async (id: string) => await this.ormRepository.findOne(id);

  getCars = async (params: ICarData = {}) => await this.ormRepository.find({where: params});

  updateCar = async (id: string, updatedData: ICarData) => await this.ormRepository.update({ id }, updatedData);
  }

export { CarRepository, ICarRepo, ICarData };
