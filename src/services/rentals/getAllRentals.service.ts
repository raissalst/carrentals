import { IRentalFilters, UserRepository } from '../../repositories';

const getAllRentalsService = async (query: IRentalFilters | any) => {
  const { returnedCar } = query;
  const rentals = await new UserRepository().findRentalsInUsers(returnedCar);
  if (rentals[0].cpf) {
    const { password, cnpj, ...newRentals } = rentals[0];
    return newRentals;
  } else {
    const { password, cpf, ...newRentals } = rentals[0];
    return newRentals;
  }
};

export default getAllRentalsService;
