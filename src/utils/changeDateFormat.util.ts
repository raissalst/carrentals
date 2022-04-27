import { Rental } from '../entities/Rental';
import { format } from 'date-fns';

const changeDateFormat = (rentals: Rental[]) => {
  rentals.forEach((_, index) => {
    const StartDate = new Date(rentals[index].rentalStartDate);
    const newStartDate = format(StartDate, 'dd-MM-yyyy');
    rentals[index].rentalStartDate = newStartDate as any;

    const ReturnDate = new Date(rentals[index].rentalReturnDate);
    const newReturnDate = format(ReturnDate, 'dd-MM-yyyy');
    rentals[index].rentalReturnDate = newReturnDate as any;

    if (rentals[index].returnedCarDate) {
      const returnedCar = new Date(rentals[index].returnedCarDate);
      const newReturnedCar = format(returnedCar, 'dd-MM-yyyy');
      rentals[index].returnedCarDate = newReturnedCar as any;
    }

  });
};

export default changeDateFormat;
