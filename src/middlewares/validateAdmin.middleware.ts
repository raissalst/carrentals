import { Request, Response, NextFunction } from 'express';
import { User } from '../entities/User';
import { UserRepository } from '../repositories';
import { ErrorHandler, handleError } from '../utils';

const validateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await new UserRepository().findByEmail(
      req.userAuth.user.email
    );
    if (!user) {
      throw new ErrorHandler(404, 'Admin not found.');
    }

    if (user.userType === 'admin') {
      return next();
    } else {
      throw new ErrorHandler(401, 'Unauthorized.');
    }
  } catch (err: any) {
    return handleError(err, res);
  }
};

export default validateAdmin;
