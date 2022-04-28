import { ErrorHandler, handleError } from '../../utils';
import { validate } from 'uuid';
import { CarRepository } from '../../repositories';
import { Request, Response } from 'express';
const updateCarController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!validate(id)) {
      throw new ErrorHandler(400, 'Id must be UUID.');
    }
    const response = await new CarRepository().getCarById(id);
    if (!response) {
      throw new ErrorHandler(404, 'Car not found.');
    }
    const { userAuth } = req;
    if (response.company.id !== userAuth.user.id) {
      throw new ErrorHandler(
        401,
        "Unauthorized. Company doesn't own this car."
      );
    }

    const { validated } = req;
    await new CarRepository().updateCar(id, validated);
    return res.status(204).json('');
  } catch (err: any) {
    handleError(err, res);
  }
};

export default updateCarController;
