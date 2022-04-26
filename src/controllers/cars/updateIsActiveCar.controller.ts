import { Request, Response } from 'express';
import { CarRepository } from '../../repositories';
import { ErrorHandler, handleError } from '../../utils';

const updateIsActiveCarController = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;
    const { userAuth } = req;

    const carToUpdate = await new CarRepository().getCarById(id);

    if (carToUpdate.company.id !== userAuth.user.id) {
      throw new ErrorHandler(
        401,
        "Unauthorized. Company doesn't own this car."
      );
    }
    const updateResponse = await new CarRepository().updateCar(id, {
      isActive: false,
    });

    res.status(204).json();
  } catch (err) {
    return handleError(err, res);
  }
};
export default updateIsActiveCarController;
