import { Request, Response } from 'express';
import { UserRepository } from '../../repositories';
import { handleError } from '../../utils';

const deleteUserProfile = async (req: Request, res: Response) => {

  try {
    const userToDeleteId = req.userAuth.user.id
    const updateResponse = await new UserRepository().updateUser(
      { isActive: false },
      userToDeleteId
    );
  
    res.status(204).json();
    
  } catch (err: any) {
    return handleError(err, res);
  }
};

export default deleteUserProfile;