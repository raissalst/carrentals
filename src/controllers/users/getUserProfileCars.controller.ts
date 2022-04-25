import { Request, Response } from 'express';
import { getProfileCarsService } from '../../services';
import { handleError, ErrorHandler } from '../../utils';

const getUserProfileCarsController = async (req: Request, res: Response) => {
  try {
    if (req.userAuth.user.userType !== 'empresa') {
      throw new ErrorHandler(403, 'Forbidden');
    }

    const userCars = await getProfileCarsService(
      req.userAuth.user.id,
      req.query
    );

    return res.status(200).json(userCars);
  } catch (err) {
    return handleError(err, res);
  }
};

export default getUserProfileCarsController;
