import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories/users/user.repository';
import { ErrorHandler, handleError } from '../utils';

const validateCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await new UserRepository().findByEmail(
      req.userAuth.user.email
    );
    if (!user) {
      throw new ErrorHandler(404, 'Company not found.');
    }

    if (user.userType === 'empresa') {
      return next();
    } else {
      throw new ErrorHandler(401, 'Unauthorized.');
    }
  } catch (err: any) {
    return handleError(err, res);
  }
};

export default validateCompany;
