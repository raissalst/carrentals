import { Request, Response } from 'express';

import { UserRepository } from '../../repositories';
import { User } from '../../entities/User';

import { jwtConfig } from '../../configs';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ErrorHandler } from '../../utils';

const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.validated;
    const user: User = await new UserRepository().findByEmail(email);
    if (!user) {
      throw new ErrorHandler(400, 'Usuario não encontrado');
    }
    const match: Boolean = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new ErrorHandler(401, 'Wrong email or password');
    }
    const token: string = JWT.sign({ email }, jwtConfig.secretKey, {
      expiresIn: jwtConfig.expiresIn,
    });
    return res.status(200).json({ acessToken: token });
  } catch (err) {
    throw new ErrorHandler(400, 'Unauthorized');
  }
};
export default loginUser;
