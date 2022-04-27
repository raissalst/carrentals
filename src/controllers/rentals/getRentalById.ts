import { Request, Response } from 'express';
import { RentalRepository } from '../../repositories';
import { ErrorHandler, handleError } from '../../utils';

const getRentalByIdController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id }: any = req.params;

    const rentalSearched = await new RentalRepository().getRentalById(id);

    for (const item in rentalSearched) {
      if (item.endsWith('Date') && rentalSearched[`${item}`]) {
        rentalSearched[`${item}`] =
          rentalSearched[`${item}`].toLocaleDateString('pt-BR');
      }
    }

    if (!rentalSearched) {
      throw new ErrorHandler(404, 'Rental not found.');
    }

    return res.status(200).json(rentalSearched);
  } catch (err) {
    return handleError(err, res);
  }
};

export default getRentalByIdController;
