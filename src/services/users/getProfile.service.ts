import { UserRepository } from '../../repositories';

const getUserProfileService = async (id: string) => {
  const user = await new UserRepository().findUserProfile(id);

  if (user[0].cpf) {
    const { password, cars, cnpj, isActive, ...userProfile } = user[0];
    return userProfile;
  } else {
    const { password, cpf, isActive, ...userProfile } = user[0];
    return userProfile;
  }
};

export default getUserProfileService;
