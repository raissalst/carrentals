import { Request, Response } from 'express';
import { getAllRentalsService } from '../../services';
import { handleError } from '../../utils';

const getAllRentalsController = async (req: Request, res: Response) => {
  try {
    const rentals = await getAllRentalsService(req.query);
    return res.status(200).json(rentals);
  } catch (err: any) {
    return handleError(err, res);
  }
};

export default getAllRentalsController;
