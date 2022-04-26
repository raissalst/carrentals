import { Request, Response } from 'express';
import { createRentalService } from '../../services';
import { handleError } from '../../utils';

const rentACarController = async (req: Request, res: Response) => {
  const requestBody = req.validated;
  const user = req.userAuth.user;
  const carId = req.params.id;

  try {
    const resp = await createRentalService(requestBody, carId, user);

    resp.rentalStartDate = resp.rentalStartDate.toLocaleString().split(',')[0];

    resp.rentalReturnDate = resp.rentalReturnDate
      .toLocaleString()
      .split(',')[0];

    const { car, customer, ...output } = resp;

    res.status(200).json(output);
  } catch (error) {
    return handleError(error, res);
  }
};

export default rentACarController;
