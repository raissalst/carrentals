import { Request, Response } from 'express';
import { CarRepository, UserRepository } from '../../repositories';
import { handleError } from '../../utils';

const deleteUserProfile = async (req: Request, res: Response) => {
  try {
    const userToDelete = req.userAuth.user;

    if (userToDelete.userType !== 'empresa') {
      const updateResponse = await new UserRepository().updateUser(
        { isActive: false },
        userToDelete.id
      );
    } else {
      const updateResponse = await new UserRepository().updateUser(
        { isActive: false },
        userToDelete.id
      );
      await new CarRepository().updateIsActive(userToDelete.id, false);
    }

    res.status(204).json();
  } catch (err: any) {
    return handleError(err, res);
  }
};

export default deleteUserProfile;
