import { User } from '../../entities/User';
import { UserRepository } from '../../repositories';

const createUserService = async (user: User) => {
  try {
    if (user.cpf) {
      const { password, isActive, cnpj, ...newUser } = await new UserRepository().saveUser(user);
      return newUser;
    } else {
      const { password, isActive, cpf, ...newUser } = await new UserRepository().saveUser(user);
      return newUser;
    }
  } catch (err: any) {
    return err;
  }
};

export default createUserService;
