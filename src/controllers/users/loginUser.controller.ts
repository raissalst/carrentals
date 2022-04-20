import { Request, Response } from 'express';

import { UserRepository } from '../../repositories';
import { User } from '../../entities/User';

import { jwtConfig } from '../../configs';

import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { ErrorHandler, handleError } from '../../utils';

const loginUserController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email, password } = req.validated;
    const user: User = await new UserRepository().findByEmail(email);

    if (!user) {
      throw new ErrorHandler(404, 'User not found');
    }
    const match: Boolean = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new ErrorHandler(401, 'Wrong email or password');
    }
    const token: string = jsonwebtoken.sign({ user }, jwtConfig.secretKey, {
      expiresIn: jwtConfig.expiresIn,
    });
    return res.status(200).json({ token: token });
  } catch (err) {
    return handleError(err, res);
  }
};
export default loginUserController;
