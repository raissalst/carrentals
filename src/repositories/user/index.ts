import { getRepository, Repository } from 'typeorm';
import { User } from '../../entities/User';

import { UserInterface, UserRepo, UserUpdateDataInterface } from './interface';

class UserRepository implements UserRepo {
  private ormRepo: Repository<User>;

  constructor() {
    this.ormRepo = getRepository(User);
  }

  createUser = async (user: UserInterface) => await this.ormRepo.save(user);

  retrieveUsers = async () => await this.ormRepo.find();
}

export default UserRepository;
