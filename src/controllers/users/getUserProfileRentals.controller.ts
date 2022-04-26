import { Request, Response } from 'express';
import { User } from '../../entities/User';
import {  
  getProfileRentalsService,
} from '../../services';
import { handleError } from '../../utils';

const getUserProfileRentalsController = async (req: Request, res: Response) => {
  try {
    const userProfileRentals = await getProfileRentalsService(
      req.userAuth.user as User,
      req.query.returnedCar
    );

    return res.status(200).json(userProfileRentals);
  } catch (err) {
    return handleError(err, res)
  }
};

export default getUserProfileRentalsController;
