import { Repository, getRepository, UpdateResult } from 'typeorm';
import { Car } from '../../entities/Car';

interface ICarData {
  name?: string;
  model?: string;
  brand?: string;
  year?: string;
  color?: string;
  doors?: number;
  fuelType?: string; //enum
  plate?: string;
  gear?: string; //enum
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
  getNotAvailableAndNotActiveCars: (params: object) => Promise<Car[]>;
  updateCar: (car: object, data) => Promise<UpdateResult>;
  updateStatusCar: (car: object, status: boolean) => Promise<UpdateResult>;
}

class CarRepository implements ICarRepo {
  private ormRepository: Repository<Car>;

  constructor() {
    this.ormRepository = getRepository(Car);
  }

  // [POST] → registra carro (como array de objetos) (autorização para empresa)🔒
  saveCar = async (Car: Car) => await this.ormRepository.save(Car);
  
  saveMultipleCars = async (cars: Car[]) =>
    await this.ormRepository
      .createQueryBuilder()
      .insert()
      .values(cars)
      .returning(["*"])
      .execute()     
      .then((cars) => cars.generatedMaps);    
    
  // - **/<:id>** [GET] → *visualizar os dados públicos de um carro (tudo menos placa, chassis, km e isActive) (autorização apenas para empresa, cliente ou admin) 🔒*
  getCarById = async (id: string) => await this.ormRepository.findOne(id);

   // - ***filtro=...*** [GET] → *filtrar por query params (name, model, brand, year, color, doors, fuelType, gear, rentalPricePerDay) todos os carros disponíveis e ativos (autorização apenas para clientes)🔒*
  // - [GET] → *visualizar dados públicos (tudo menos placa, chassis, km e isActive) de todos os carros disponíveis (available=true e active=true) cadastrados na plataforma (autorização para admin, empresa e cliente)🔒*
  getCars = async (params?: ICarData) => await this.ormRepository.find({where: params});

  // - ***?available=false ou ?active=false*** ***ou ?available=false&&active=false*** [GET] → *filtrar por query params dados públicos de todos os carros que não estão disponíveis para alugar (autorização apenas para admins)🔒*
  getNotAvailableAndNotActiveCars = async (params: object) => await this.ormRepository.find({where: {params}})

  // - [PATCH] → *atualizar dados de um carro (autorização apenas para empresas)🔒*
  updateCar = async (car: object, data) => await this.ormRepository.update(car, data);
  
  // - **/<:id>** [PATCH] → *desativar um carro (autorização apenas para empresas)  🔒*
  updateStatusCar = async (car: object, status) => await this.ormRepository.update(car, status);
}

export { CarRepository, ICarRepo, ICarData };
