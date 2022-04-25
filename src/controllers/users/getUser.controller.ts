import { Request, Response } from "express";
import { getAllUsersService } from "../../services";
import { handleError } from '../../utils';

const getUserController = async (req: Request, res: Response) => {
  try {
  const allUsers = await getAllUsersService(req.query);

  return res.status(200).json(allUsers);
  
  } catch (err: any) {
    return handleError(err, res);
  }
};

export default getUserController;