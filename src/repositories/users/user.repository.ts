import { Repository, getRepository } from 'typeorm';
import { User } from '../../entities/User';

interface IUserRepo {
  saveUser: (user: User) => Promise<User>;
}

class UserRepository implements IUserRepo {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  saveUser = async (user: User) => await this.ormRepository.save(user);
}

export { UserRepository, IUserRepo };
