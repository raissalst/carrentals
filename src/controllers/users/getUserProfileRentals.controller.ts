import { Request, Response } from 'express';
import { getProfileCarsService, getProfileRentalsService } from '../../services';
import { handleError, ErrorHandler } from '../../utils';

const getUserProfileRentalsController = async (req: Request, res: Response) => {
  try {
    const userProfileRentals = await getProfileRentalsService(
      req.userAuth.user,
      req.query
    )

    return res.status(200).json( userProfileRentals )
  } catch (error) {
    
  }
}

export default getUserProfileRentalsController;
