import { Repository, getRepository } from 'typeorm';
import { User } from '../../entities/User';

interface IUserRepo {
  saveUser: (user: User) => Promise<User>;
  findByEmail: (email: string) => Promise<User>;
  findUsersByData: (data: User) => Promise<User[]>;
  findAll: () => Promise<User[]>;
  findById: (id: string) => Promise<User>;
  updateUser: (userData: any, id: string) => Promise<Object>;
}

class UserRepository implements IUserRepo {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  saveUser = async (user: User) => await this.ormRepository.save(user);

  findByEmail = async (email: string) =>
    await this.ormRepository.findOne({ email: email });

    findUsersByData = async (data: User) => await this.ormRepository.find({where: [
    {cpf: data.cpf}, {cnpj: data.cnpj}, {email: data.email}
  ]});

  findAll = async() => await this.ormRepository.find();

  findById = async (id: string) => await this.ormRepository.findOne({ id });

  updateUser = async (userData: any, id: string) =>
    await this.ormRepository
      .createQueryBuilder()
      .update(User)
      .set(userData)
      .where({ id: id })
      .returning('*')
      .execute();
}

export { UserRepository, IUserRepo };