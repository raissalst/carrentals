import { RentalRepository } from '../../repositories';

const getAllRentalsService = async () => {
  const rentals = await new RentalRepository().getAllRental();
  return rentals;
};

export default getAllRentalsService;
