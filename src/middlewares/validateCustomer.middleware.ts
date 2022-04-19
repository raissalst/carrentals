import { Request, Response, NextFunction } from 'express';
import { User } from '../entities/User';

const validateCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await new UserRepository().findByEmail(
      (req.userAuth as User).email
    )

    if (user.userType === 'cliente') {
      return next();
    }

  } catch (error) {
    return next(error);
  }

  return res.status(401).json({ message: 'Unauthorized' });
};

export default validateCustomer;