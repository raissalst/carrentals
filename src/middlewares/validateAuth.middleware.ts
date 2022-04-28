import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../configs';
import { ErrorHandler } from '../utils';

const validateAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new ErrorHandler(401, 'Missing authorization token');
    }

    jwt.verify(token, jwtConfig.secretKey, (err, decoded) => {
      req.userAuth = decoded as string;
      if (err) {
        throw new ErrorHandler(401, err);
      }

      return next();
    });
  } catch (error) {
    return next(error);
  }
};

export default validateAuth;
