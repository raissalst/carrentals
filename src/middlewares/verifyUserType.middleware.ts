import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { jwtConfig } from '../configs';
import { User } from '../entities/User';
import { ErrorHandler } from '../utils';

interface IDecoded {
  iat: number;
  exp: number;
  user: User;
}

const verifyUserType = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userType } = req.validated;

    if (userType !== 'admin') {
      return next();
    }

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new ErrorHandler(401, 'missing authorization token');
    }

    verify(token, jwtConfig.secretKey, (err, decoded) => {
      if (err) {
        throw new ErrorHandler(401, err);
      }

      if ((decoded as IDecoded).user.userType !== 'admin') {
        throw new ErrorHandler(401, 'Unauthorized');
      }

      return next();
    });
  } catch (error) {
    return next(error);
  }
};

export default verifyUserType;
