import { Request, Response } from 'express';
import { UserRepository } from '../../repositories';

const updateIsActiveUserController = async (req: Request, res: Response) => {
  const userToChange = req.userFromQuery;
  const updateResponse = await new UserRepository().updateUser(
    { isActive: !userToChange.isActive },
    userToChange.id
  );

  res.status(204).json();
};

export default updateIsActiveUserController;
