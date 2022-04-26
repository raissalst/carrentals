import { User } from '../../entities/User';
import { RentalRepository } from '../../repositories';
import { ErrorHandler } from '../../utils';
import { carObjectKeyFilter } from '../../utils';

const getProfileRentalsService = async (user: User, closedRental: any) => {
  
  const closedRentalQuery = closedRental?.trim().toLowerCase();
  
  if (closedRentalQuery && closedRentalQuery !== 'true' && closedRentalQuery !== 'false') {
    throw new ErrorHandler(400, 'Query params informed must be true or false.');
  }
  const rentals = await new RentalRepository().findRentals(
    user.id,
    closedRental as boolean
  );
  
  carObjectKeyFilter(user.userType, rentals);

  return rentals;
};

export default getProfileRentalsService;
