import { Request, Response } from 'express';
import { createRentalService } from '../../services';
import { ErrorHandler, handleError } from '../../utils';

const rentACarController = async (req: Request, res: Response) => {
  const requestBody = req.validated;
  const user = req.userAuth.user;
  const carId = req.params.id;

  try {
    const resp = await createRentalService(requestBody, carId, user);

    if (!resp.rentalStartDate) {
      throw new ErrorHandler(resp.status, resp.message);
    }

    resp.rentalStartDate = resp.rentalStartDate.toLocaleDateString('pt-BR');

    resp.rentalReturnDate = resp.rentalReturnDate.toLocaleDateString('pt-BR');

    const { car, customer, ...output } = resp;

    res.status(200).json(output);
  } catch (error) {
    return handleError(error, res);
  }
};

export default rentACarController;
