import { DeleteResult, UpdateResult } from 'typeorm';
import { User } from '../../entities/User';

interface UserInterface {
  uuid: string;
  name: string;
  email: string;
  isAdm: boolean;
  password: string;
  createdOn: Date;
  updatedOn: Date;
}

interface UserUpdateDataInterface {
  name?: string;
  email?: string;
  password?: string;
  updatedOn?: Date;
}

interface UserRepo {
  createUser: (user: UserInterface) => Promise<User>;
  retrieveUsers: () => Promise<User[]>;
}

export { UserInterface, UserRepo, UserUpdateDataInterface };
