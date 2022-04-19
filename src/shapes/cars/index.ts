import {
    getRepository,
    Repository,
  } from "typeorm";
  import { Car } from "../../entities/Car";
  
  interface CarRepo {
    save: (car: Car) => Promise<Car>;
    getAll: () => Promise<Car[]>;
    saveMultiple: (cars: Car[]) => Promise<any>;
  }
  
  class CarRepository implements CarRepo {
    private ormRepo: Repository<Car>;
  
    constructor() {
      this.ormRepo = getRepository(Car);
    }
    
    // - [POST] → *registra carro (como array de objetos) (autorização para empresa)🔒*
    save = async (car: Car) => await this.ormRepo.save(car);    
    saveMultiple = async (cars: Car[]) => {
      return await this.ormRepo
        .createQueryBuilder() 
        .insert() 
        .values(cars) 
        .returning(["*"]) //retornar tudo
        .execute() 
        .then((cars) => cars.generatedMaps);  
    };  
    
    // - [GET] → *visualizar dados públicos (tudo menos placa, chassis, km e isActive) de todos os carros disponíveis (available=true e active=true) cadastrados na plataforma (autorização para admin, empresa e cliente)🔒*
    getAll = async () => await this.ormRepo.find();

    // - ***?available=false ou ?active=false*** ***ou ?available=false&&active=false*** [GET] → *filtrar por query params dados públicos de todos os carros que não estão disponíveis para alugar (autorização apenas para admins)🔒*
    getNotActiveAndNotAvailCarsByParam = async (params) => await this.ormRepo.find({where: params});
    
    // - ***filtro=...*** [GET] → *filtrar por query params (name, model, brand, year, color, doors, fuelType, gear, rentalPricePerDay) todos os carros disponíveis e ativos (autorização apenas para clientes)🔒*
    getActivCarsByParam = async (params) => await this.ormRepo.find({where: params});

    // - **/<:id>** [POST] → *alugar um carro (autorização apenas para clientes) 🔒*
    saveIntoRentals = async (id) => await this.ormRepo.save(id)   //como fazer??
    
    getById = async (id) => await this.ormRepo.findOne(id)
    // - **/<:id>** [GET] → *visualizar os dados públicos de um carro (tudo menos placa, chassis, km e isActive) (autorização apenas para empresa, cliente ou admin) 🔒*

    updateCarData = async (data, entidade) => await this.ormRepo.update(data, entidade) // necessita 2 parametros
    // - **/<:id>** [PATCH] → *atualizar dados de um carro (autorização apenas para empresas)🔒*
    
    // - **/<:id>** [DELETE] → *desativar um carro (autorização apenas para empresas)  🔒*  RETIRAR?
    
  }
  
  export default CarRepository;
