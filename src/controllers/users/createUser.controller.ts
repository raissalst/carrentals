import { Request, Response } from 'express';
import { Address } from '../../entities/Address';
import { User } from '../../entities/User';
import { UserRepository } from '../../repositories';
import { createUserService, createAddressService } from '../../services';
import { ErrorHandler, handleError } from '../../utils';

const createUserController = async (req: Request, res: Response) => {
  try {
    const checkUser = await new UserRepository().findUsersByData(
      req.validated as User
    );

    if (checkUser.length > 0) {
      throw new ErrorHandler(409, 'User email, cpf or cnpj already registered');
    }

    const {
      name,
      email,
      password,
      phone,
      userType,
      cpf,
      cnpj,
      isActive,
      ...addressData
    } = req.validated;
    const newAddress = await createAddressService(addressData as Address);

    const { address, city, state, country, ...newUser } = req.validated;
    newUser.address = newAddress;
    const user = await createUserService(newUser as User);

    return res.status(201).json(user);
  } catch (err: any) {
    return handleError(err, res);
  }
};

export default createUserController;
