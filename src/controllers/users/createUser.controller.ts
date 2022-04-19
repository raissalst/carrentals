import { Request, Response } from 'express';
import { User } from '../../entities/User';
import createUserService from '../../services/users/create.service';
import { handleError } from '../../utils';

const createUserController = async (
  req: Request,
  res: Response,
) => {
  try {
    const user = createUserService(req.validated as User);
    return res.status(201).json(user);
  } catch (err: any) {
    return handleError(err, res);
  }
}

export default createUserController;
