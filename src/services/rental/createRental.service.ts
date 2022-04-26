import { CarRepository, RentalRepository } from '../../repositories';
import { ErrorHandler, handleError } from '../../utils';
import { v4 } from 'uuid';
import { User } from '../../entities/User';

interface IRequestBody {
  rentalStartDate: Date;
  rentalReturnDate: Date;
}

const convertDate = (dateString) => {
  const splitDate = dateString.split('/');
  const returnDate = new Date(
    Number(splitDate[2]),
    Number(splitDate[1]) - 1,
    Number(splitDate[0])
  );
  return returnDate;
};

const calculateRentPreview = (start, end, price) => {
  const returnDate = convertDate(start);
  const startDate = convertDate(end);
  let diff = Math.abs(returnDate.getTime() - startDate.getTime());
  let days = Math.ceil(diff / (1000 * 3600 * 24));

  return days * price;
};

const createRentalService = async (
  requestBody: IRequestBody,
  carId: string,
  customer: User
) => {
  const { rentalReturnDate, rentalStartDate } = requestBody;

  try {
    const car = await new CarRepository().getCarById(carId);

    if (!car) {
      throw new ErrorHandler(404, 'Car not found');
    }

    const newRent = {
      id: v4(),
      rentalStartDate: convertDate(rentalStartDate),
      rentalReturnDate: convertDate(rentalReturnDate),
      returnedCarDate: null,
      returnedCar: false,
      rentalPricePerDay: car.rentalPricePerDay,
      rentalPricePreview: calculateRentPreview(
        rentalStartDate,
        rentalReturnDate,
        car.rentalPricePerDay
      ),
      rentalPriceTotal: 0,
      mileageRan: 0,
      car: car,
      customer: customer,
    };
    const rent = await new RentalRepository().saveRental(newRent);

    return rent;
  } catch (error) {
    return error;
  }
};

export default createRentalService;
