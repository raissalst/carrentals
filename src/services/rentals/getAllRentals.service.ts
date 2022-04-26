import { IRentalFilters, UserRepository } from '../../repositories';

const getAllRentalsService = async (query: IRentalFilters | any) => {
  try {
    const { returnedCar } = query;
    const rentals = await new UserRepository().findRentalsInUsers(returnedCar);
    rentals.forEach((element) => {
      delete element.password;
      if (element.cpf) {
        delete element.cnpj;
      } else {
        delete element.cpf;
      }
    });
    const rentalsFiltered = rentals.filter((item) => item.rentals.length > 0);
    return rentalsFiltered;
  } catch (err: any) {
    return err;
  }
};

export default getAllRentalsService;
