import { QueryFailedError } from 'typeorm';
import { User } from '../../entities/User';
import { UserRepository } from '../../repositories';
import { ErrorHandler } from '../../utils';

interface IDetail extends QueryFailedError {
  detail: string;
}

const createUserService = async (user: User) => {
  try {
    const { password, ...newUser } = await new UserRepository().saveUser(user);
    return newUser;
  } catch (err: any) {
    if (err instanceof QueryFailedError) {
      const detail = (err as IDetail).detail;
      if (detail.includes('already exists')) {
        throw new ErrorHandler(409, detail);
      }
    }
  }
};

export default createUserService;
