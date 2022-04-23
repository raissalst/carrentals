import { Request, Response } from 'express';
import { UserRepository } from '../../repositories';
import {
  updateAddressProfileService,
  updateProfileService,
} from '../../services';
import { handleError } from '../../utils';

const updateUserProfileController = async (req: Request, res: Response) => {
  try {
    let userAddressProfile;
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
    // console.log(req.userAuth.user)
    const { address, city, state, country, ...userData } = req.validated;
    
    const userProfile = await updateProfileService(
      userData,
      req.userAuth.user.id
    );
    if (Object.keys(addressData).length > 0) {
      userAddressProfile = await updateAddressProfileService(
        userProfile.addressId,
        addressData
    );
      userProfile['address'] = [userAddressProfile]

    }
    

    return res.status(200).json(userProfile);
  } catch (err: any) {
    return handleError(err, res);
  }
};

export default updateUserProfileController;
