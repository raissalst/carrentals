import { IRentalFilters, RentalRepository } from '../../repositories';

const getAllRentalsService = async (query: IRentalFilters) => {
  const { returnedCar } = query;
  const rentals = await new RentalRepository().getAllRental({ returnedCar });
  return rentals;
};

export default getAllRentalsService;
