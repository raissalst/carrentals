import { Request, Response } from 'express';
import { CarRepository } from '../../repositories';
import { ErrorHandler, handleError } from '../../utils';
import { validate } from 'uuid';

const getCarByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!validate(id)) {
      throw new ErrorHandler(400, 'Id can be UUID');
    }

    const response = await new CarRepository().getCarById(id);
    if (!response) {
      throw new ErrorHandler(404, 'Car not found.');
    }
    const {
      plate,
      chassis,
      isActive,
      currentMileage,
      company,
      ...responseToSend
    } = response;
    res.status(200).json(responseToSend);
  } catch (error) {
    return handleError(error, res);
  }
};

export default getCarByIdController;
