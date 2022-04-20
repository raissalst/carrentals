import { NextFunction, Response, Request } from 'express';
import { UserRepository } from '../repositories';
import { ErrorHandler } from '../utils';

const getUserFromQueryId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const user = await new UserRepository().findById(id);

    if (!user) {
      throw new ErrorHandler(404, 'User not found');
    }
    req.userFromQuery = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default getUserFromQueryId;
