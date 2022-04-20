import { User } from '../../entities/User';
import { UserRepository } from '../../repositories';

const createUserService = async (user: User) => {
  try {
    const { password, ...newUser } = await new UserRepository().saveUser(user);
    return newUser;
  } catch (err: any) {
    return err;
  }
};

export default createUserService;
