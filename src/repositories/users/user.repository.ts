import { Repository, getRepository, QueryBuilder } from 'typeorm';
import { User } from '../../entities/User';

interface IUserFilters {
  userType?: string;
}

interface IUserRepo {
  saveUser: (user: User) => Promise<User>;
  findByEmail: (email: string) => Promise<User>;
  findUsersByData: (data: User) => Promise<User[]>;
  findAll: (query: Array<IUserFilters> | IUserFilters) => Promise<User[]>;
  findUsers: (data) => Promise<User[]>;
  findById: (id: string) => Promise<User>;
  updateUser: (userData: any, id: string) => Promise<Object>;
  findUserProfile: (id: string) => Promise<User[]>;
  findRentalsInUsers: (query?: boolean) => Promise<User[]> | any;
  findUserCars: (id: string) => Promise<User[]>;
}

class UserRepository implements IUserRepo {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  saveUser = async (user: User) => await this.ormRepository.save(user);

  findByEmail = async (email: string) =>
    await this.ormRepository.findOne({ email: email });

  findUsersByData = async (data: User) =>
    await this.ormRepository.find({
      where: [{ cpf: data.cpf }, { cnpj: data.cnpj }, { email: data.email }],
    });

  findAll = async (query: IUserFilters) => {
    const basicQuery = await this.ormRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.address', 'address');

    if (query.userType) {
      return basicQuery.where('user.userType = :userType', query).getMany();
    } else {
      return basicQuery.getMany();
    }
  };

  findUsers = async (data) =>
    await this.ormRepository.find({
      where: [{ cpf: data.cpf }, { cnpj: data.cnpj }, { email: data.email }],
    });
  findById = async (id: string) => await this.ormRepository.findOne({ id });

  updateUser = async (userData: any, id: string) =>
    await this.ormRepository
      .createQueryBuilder()
      .update(User)
      .set(userData)
      .where({ id: id })
      .returning('*')
      .execute();

  findUserProfile = async (id: string) =>
    await this.ormRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.address', 'address')
      .where({ id: id })
      .getMany();

  findRentalsInUsers = async (query?: boolean) =>
    await this.ormRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.address', 'address')
      .leftJoinAndSelect('user.rentals', 'rentals')
      .where(query !== undefined ? 'rentals.returnedCar =:returnedCar' : '', {
        returnedCar: query,
      });
  findUserCars = async (id: string) =>
    await this.ormRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.cars', 'cars')
      .where({ id: id })
      .getMany();
}

export { UserRepository, IUserRepo, IUserFilters };
