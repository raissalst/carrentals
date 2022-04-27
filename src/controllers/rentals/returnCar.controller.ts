import { Request, Response } from 'express';
import { RentalRepository } from '../../repositories';
import { ErrorHandler, handleError } from '../../utils';
import { validate } from 'uuid';
import { returnCarService } from '../../services';

const returnCarController = async (req: Request, res: Response) => {
  try {
    const { mileageRun } = req.validated;
    const { userAuth } = req;
    const { id } = req.params;
    if (!validate(id)) {
      throw new ErrorHandler(400, 'Id can be UUID');
    }
    const rental = await new RentalRepository().getRentalById(id);
    if (!rental) {
      throw new ErrorHandler(404, 'Rental not found.');
    }
    if (rental.returnedCar) {
      throw new ErrorHandler(400, 'This rent already been finished');
    }

    await returnCarService(userAuth.user, rental, mileageRun);

    const updatedRental = await new RentalRepository().getRentalById(id);

    res.status(200).json(updatedRental);
  } catch (error) {
    return handleError(error, res);
  }
};

export default returnCarController;
