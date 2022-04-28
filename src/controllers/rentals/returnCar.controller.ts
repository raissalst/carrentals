import { Request, Response } from 'express';
import { RentalRepository } from '../../repositories';
import { ErrorHandler, handleError } from '../../utils';
import { validate } from 'uuid';
import { returnCarService } from '../../services';

const returnCarController = async (req: Request, res: Response) => {
  try {
    const { mileageRan } = req.validated;
    const { userAuth } = req;
    const { id } = req.params;
    if (!validate(id)) {
      throw new ErrorHandler(400, 'Id must be UUID');
    }
    const rental = await new RentalRepository().findRentalCar(id);

    if (!rental) {
      throw new ErrorHandler(404, 'Rental not found.');
    }
    if (rental.returnedCar) {
      throw new ErrorHandler(400, 'This rental has already been finished.');
    }

    await returnCarService(userAuth.user, rental, mileageRan);

    const updatedRental = await new RentalRepository().getRentalById(id);

    const { rentalStartDate, rentalReturnDate, returnedCarDate, ...someData } =
      updatedRental;
    const start = updatedRental.rentalStartDate.toLocaleDateString('pt-BR');
    const returned = updatedRental.returnedCarDate.toLocaleDateString('pt-BR');
    const end = updatedRental.rentalReturnDate.toLocaleDateString('pt-BR');

    const response = {
      rentalStartDate: start,
      returnedCarDate: returned,
      rentalReturnDate: end,
      ...someData,
    };

    res.status(200).json(response);
  } catch (error) {
    return handleError(error, res);
  }
};

export default returnCarController;
