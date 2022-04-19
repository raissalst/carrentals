import { Repository, getRepository, DeleteResult } from 'typeorm';
import { User } from '../../entities/User';

interface IUserRepo {
  saveUser: (user: User) => Promise<User>;
  findByEmail: (email: string) => Promise<User>;
  findUsers: () => Promise<User[]>;
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

  findUsers = async () => await this.ormRepository.find();

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
