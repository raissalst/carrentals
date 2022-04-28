import { Request, Response } from 'express';
import { UserRepository } from '../../repositories';
import { updateCompanyIsActive } from '../../services';
import { handleError } from '../../utils';

const updateIsActiveUserController = async (req: Request, res: Response) => {
  try {
    const userToChange = req.userFromQuery;
    if (userToChange.userType === 'cliente') {
      await new UserRepository().updateUser(
        { isActive: !userToChange.isActive },
        userToChange.id
      );
    }

    if (userToChange.userType === 'empresa') {
      await updateCompanyIsActive(userToChange);
    }
    res.status(204).json();
  } catch (error) {
    return handleError(error, res);
  }
};

export default updateIsActiveUserController;
