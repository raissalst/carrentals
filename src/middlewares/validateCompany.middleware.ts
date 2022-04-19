import { Request, Response, NextFunction } from 'express';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/users/user.repository'

const validateCompany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await new UserRepository().findByEmail(
      (req.userAuth as User).email
    )

    if (user.userType === 'empresa') {
      return next();
    }

  } catch (error) {
    return next(error);
  }

  return res.status(401).json({ message: 'Unauthorized' });
};

export default validateCompany;