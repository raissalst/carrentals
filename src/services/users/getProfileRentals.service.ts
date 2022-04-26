import { User } from '../../entities/User';
import { RentalRepository, UserRepository } from '../../repositories';
import { ErrorHandler } from '../../utils';
import { carObjectKeyFilter } from '../../utils';

const getProfileRentalsService = async (user: User, closedRental) => {
  const rentals = await new RentalRepository().findRentals(user.id);

  carObjectKeyFilter(user.userType, rentals);

  return rentals;
};

export default getProfileRentalsService;
