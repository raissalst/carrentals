import { User } from '../../entities/User';
import { CarRepository, UserRepository } from '../../repositories';

const updateCompanyIsActive = async (company: User) => {
  const companyCars = await new UserRepository().findUserCars(company.id);

  const updateResponse = await new UserRepository().updateUser(
    { isActive: !company.isActive },
    company.id
  );

  await new CarRepository().updateIsActive(company.id, !company.isActive);
};

export default updateCompanyIsActive;
