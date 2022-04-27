import { UserRepository, IUserFilters } from '../../repositories';

const getAllUsersService = async (query: IUserFilters) => {
  const { userType } = query;
  const users = await new UserRepository().findAll({ userType });
  const userFilter = []

  for (let i=0; i<users.length; i++) {
    if (users[i].cpf) {
      const { password, cars, cnpj, ...userProfile } = users[i];
      userFilter.push(userProfile);
    } else {
      const { password, cpf, ...userProfile } = users[i];
      userFilter.push(userProfile);
    }
  }

  return userFilter;
};

export default getAllUsersService;