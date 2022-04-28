import { Rental } from '../../entities/Rental';
import { User } from '../../entities/User';
import { CarRepository, RentalRepository } from '../../repositories';
import { calculateRent } from '../../utils';

const returnCarService = async (
  company: User,
  rental: Rental,
  mileageRan: number
) => {
  const returnDate = new Date();
  const updateBody = {
    mileageRan,
    returnedCar: true,
    returnedCarDate: returnDate,
    rentalPriceTotal: calculateRent(
      rental.rentalStartDate,
      returnDate,
      rental.rentalPricePerDay
    ),
  };
  await new RentalRepository().updateRental(rental.id, updateBody);

  const newCurrentMileage = mileageRan + rental.car.currentMileage;
  if (company.isActive) {
    await new CarRepository().updateCar(rental.car.id, {
      availableToRent: true,
      currentMileage: newCurrentMileage,
    });
  } else {
    await new CarRepository().updateCar(rental.car.id, {
      currentMileage: newCurrentMileage,
    });
  }
};

export default returnCarService;
