import { Repository, getRepository } from 'typeorm';
import { Car } from '../../entities/Car';

interface ICarRepo {
  saveCar: (Car: Car) => Promise<Car>;
  saveMultipleCars: (cars: Car[]) => Promise<any>;
  getCarById: (id: string) => Promise<Car>;
  getCars: (params?: object[]) => Promise<Car[]>;
  getNotAvailableAndNotActiveCars: (params) => Promise<Car[]>
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
  getCarById = async (id) => await this.ormRepository.findOne(id);

   // - ***filtro=...*** [GET] → *filtrar por query params (name, model, brand, year, color, doors, fuelType, gear, rentalPricePerDay) todos os carros disponíveis e ativos (autorização apenas para clientes)🔒*
  // - [GET] → *visualizar dados públicos (tudo menos placa, chassis, km e isActive) de todos os carros disponíveis (available=true e active=true) cadastrados na plataforma (autorização para admin, empresa e cliente)🔒*
  getCars = async (params?) => await this.ormRepository.find({where: params});

  // - ***?available=false ou ?active=false*** ***ou ?available=false&&active=false*** [GET] → *filtrar por query params dados públicos de todos os carros que não estão disponíveis para alugar (autorização apenas para admins)🔒*
  getNotAvailableAndNotActiveCars = async (params) => await this.ormRepository.find({where: params})

  updateCar = async (params?) => await this.ormRepository.find({where: params});
  
}

export { CarRepository, ICarRepo };


// - **/<:id>** [PATCH] → *atualizar dados de um carro (autorização apenas para empresas)🔒*

// - **/<:id>** [POST] → *alugar um carro (autorização apenas para clientes) 🔒*

// - **/<:id>** [DELETE] → *desativar um carro (autorização apenas para empresas)  🔒*