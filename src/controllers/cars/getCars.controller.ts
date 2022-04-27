import { Request, Response } from 'express';
import { getCarsService } from '../../services';
import { handleError } from '../../utils';

const getCarsController = async (req: Request, res: Response) => {
  try {
    const cars = await getCarsService(req);
    return res.status(200).json(cars);
  } catch (err: any) {
    return handleError(err, res);
  }
};

export default getCarsController;
