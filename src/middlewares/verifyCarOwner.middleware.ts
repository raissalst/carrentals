import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../utils';
import { validate } from 'uuid';
import { CarRepository, RentalRepository } from '../repositories';

const verifyCarOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userAuth } = req;
    const { id } = req.params;

    if (!validate(id)) {
      throw new ErrorHandler(400, 'Id must be UUID.');
    }
    const rental = await new RentalRepository().findRentalCar(id);

    if (!rental) {
      throw new ErrorHandler(404, 'Rental not found.');
    }
    if (rental.returnedCar) {
      throw new ErrorHandler(400, 'This rental has already been finished.');
    }

    const car = await new CarRepository().getCarById(rental.car.id);

    if (car.company.id !== userAuth.user.id) {
      throw new ErrorHandler(
        401,
        "Unauthorized. Company doesn't own this car."
      );
    }

    req.rental = rental;
    next();
  } catch (error) {
    next(error);
  }
};

export default verifyCarOwner;
