import { Request, Response } from 'express';
import { UserRepository } from '../../repositories';
import { ErrorHandler, handleError } from '../../utils';

const getUserByIdController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id }: any = req.params;
    const userLoggedType = req.userAuth.user.userType;

    const [userProfileSearched] = await new UserRepository().findUserProfile(
      id
    );

    if (
      userProfileSearched.userType === 'admin' &&
      userLoggedType !== 'admin'
    ) {
      throw new ErrorHandler(401, 'Unauthorized.');
    }

    if (userLoggedType === 'admin') {
      if (!userProfileSearched.cpf) {
        const { cpf, password, ...userProfileSearchedFiltered } =
          userProfileSearched;
        return res.status(200).json(userProfileSearchedFiltered);
      }
      const { cnpj, password, ...userProfileSearchedFiltered } =
        userProfileSearched;
      return res.status(200).json(userProfileSearchedFiltered);
    }

    const publicProfileReturn = {
      name: userProfileSearched.name,
      email: userProfileSearched.email,
    };

    if (
      userLoggedType === 'cliente' &&
      userProfileSearched.userType === 'cliente'
    ) {
      throw new ErrorHandler(401, 'Unauthorized.');
    }

    return res.status(200).json(publicProfileReturn);
  } catch (err) {
    return handleError(err, res);
  }
};

export default getUserByIdController;
