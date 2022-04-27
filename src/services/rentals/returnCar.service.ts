import { Rental } from '../../entities/Rental';
import { User } from '../../entities/User';
import { RentalRepository } from '../../repositories';
import { calculateRent } from '../../utils';

const returnCarService = async (
  company: User,
  rental: Rental,
  mileageRun: number
) => {
  const returnDate = new Date();
  const updateBody = {
    mileageRun,
    returnedCar: true,
    returnedCarDate: returnDate,
    availableToRent: company.isActive ? true : false,
    rentalPriceTotal: calculateRent(
      rental.rentalStartDate,
      returnDate,
      rental.rentalPricePerDay
    ),
  };

  await new RentalRepository().updateRental(rental.id, updateBody);
};

export default returnCarService;
