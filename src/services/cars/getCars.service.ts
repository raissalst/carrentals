import { CarRepository } from '../../repositories';
import { ErrorHandler } from '../../utils';

const getCarsService = async (req: any) => {
  const cars = await new CarRepository().getCars();
  const hasParams: any = req.query;
  const userLoggedType = req.userAuth.user.userType;
  const paramsKeys = Object.keys(hasParams);
  const output = [];
  const onlyAvailableAndActiveCars = [];

  cars.map((car) => {
    if (car.isActive && car.availableToRent) {
      onlyAvailableAndActiveCars.push(car);
    }
  });

  const retrieveCars = [];

  onlyAvailableAndActiveCars.forEach((element) => {
    const { plate, chassis, currentMileage, isActive, ...car } = element;
    retrieveCars.push(car);
  });

  if (hasParams !== undefined) {
    if (
      (hasParams.availableToRent || hasParams.isActive) &&
      userLoggedType === 'admin'
    ) {
      for (const car of cars) {
        if (paramsKeys.length === 2) {
          if (car[paramsKeys[0]] === false && car[paramsKeys[1]] === false) {
            output.push(car);
          }
        }
        if (paramsKeys.length === 1) {
          if (car[paramsKeys[0]] === false) {
            output.push(car);
          }
        }
      }

      return output;
    }

    const paramsForCustomers = [
      'name',
      'model',
      'brand',
      'year',
      'color',
      'doors',
      'fuelType',
      'gear',
      'rentalPricePerDay',
    ];

    const auxArrayCustomer = [];
    for (const param of paramsKeys) {
      if (paramsForCustomers.includes(param)) {
        auxArrayCustomer.push(param);
      } else {
        throw new ErrorHandler(400, 'Filter not available.');
      }
    }

    const paramsSent = Object.entries(hasParams);

    if (auxArrayCustomer.length !== 0 && userLoggedType === 'cliente') {
      for (const car of retrieveCars) {
        let count = 0;
        let carItem = '';
        for (const item of paramsSent) {
          if (typeof item[1] === 'string') {
            item[1] = item[1].toLowerCase();
          }
          if (typeof car[item[0]] === 'string') {
            carItem = car[item[0]].toLowerCase();
            if (carItem === item[1]) {
              count++;
            }
          } else {
            if (car[item[0]] == item[1]) {
              count++;
            }
          }
        }
        if (count === paramsSent.length) {
          output.push(car);
        }
      }

      return output;
    }
  }
  return retrieveCars;
};

export default getCarsService;
