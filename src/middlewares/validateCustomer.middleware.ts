import { Request, Response, NextFunction } from 'express';
import { User } from '../entities/User';
import { UserRepository } from '../repositories';
import { ErrorHandler, handleError } from '../utils';

const validateCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await new UserRepository().findByEmail(
      (req.userAuth as User).email
    );
    if (!user) {
      throw new ErrorHandler(404, 'Customer not found');
    }

    if (user.userType === 'cliente') {
      return next();
    } else {
      throw new ErrorHandler(401, 'Unauthorized');
    }
  } catch (err: any) {
    return handleError(err, res);
  }
};

export default validateCustomer;
