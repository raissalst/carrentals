import { Request, Response } from 'express';
import { RentalRepository } from '../../repositories';
import { handleError } from '../../utils';
import { returnCarService } from '../../services';

const returnCarController = async (req: Request, res: Response) => {
  try {
    const { mileageRan } = req.validated;
    const { userAuth, rental } = req;
    const { id } = req.params;

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
