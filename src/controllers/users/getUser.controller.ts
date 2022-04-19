import { Request, Response } from "express";
import { UserRepository } from "../../repositories/users/user.repository";

const getUserController = async (_: Request, res: Response) => {
  const allUsers = await new UserRepository().findUsers();

  return res.status(200).json(allUsers);
};

export default getUserController;