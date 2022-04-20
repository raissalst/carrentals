import { Request, Response } from "express";
import { UserRepository } from "../../repositories/users/user.repository";
import { handleError } from '../../utils';

const getUserController = async (_: Request, res: Response) => {
  try {
  const allUsers = await new UserRepository().findAll();

  return res.status(200).json(allUsers);
  
  } catch (err: any) {
    return handleError(err, res);
  }
};

export default getUserController;