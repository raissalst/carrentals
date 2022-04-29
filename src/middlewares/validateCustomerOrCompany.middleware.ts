import { Response, Request, NextFunction } from 'express';
import { UserRepository } from '../repositories';
import { ErrorHandler, handleError } from '../utils';

const validateCustomerOrCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userAuth } = req;
  try {
    const user = await new UserRepository().findByEmail(userAuth.user.email);

    if (!user) {
      throw new ErrorHandler(404, 'User not found.');
    }

    if (user.userType === 'empresa' || user.userType === 'cliente') {
      return next();
    } else {
      throw new ErrorHandler(401, 'Unauthorized.');
    }
  } catch (err: any) {
    return handleError(err, res);
  }
};

export default validateCustomerOrCompany;
