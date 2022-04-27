import { Rental } from '../entities/Rental';

const carObjectKeyFilter = (user: string, rentals: Rental[]) => {
  if (user === 'cliente') {
    rentals.forEach((_, index) => {
      let { car } = rentals[index];
      delete car.plate;
      delete car.chassis;
      delete car.currentMileage;
      delete car.rentalPricePerDay;
      delete car.availableToRent;
      delete car.isActive;
    });
  } else if (user === 'empresa') {
    rentals.forEach((_, index) => {
      let { car } = rentals[index];
      delete car.currentMileage;
      delete car.rentalPricePerDay;
      delete car.availableToRent;
      delete car.isActive;
    });
  }
};

export default carObjectKeyFilter;
