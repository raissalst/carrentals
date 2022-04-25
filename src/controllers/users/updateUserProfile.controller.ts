import { Request, Response } from 'express';
import { Address } from '../../entities/Address';
import { User } from '../../entities/User';
import { AddressRepository, UserRepository } from '../../repositories';
import {
  updateAddressProfileService,
  updateProfileService,
} from '../../services';
import { handleError } from '../../utils';

const updateUserProfileController = async (req: Request, res: Response) => {
  try {
    let userAddressProfile: Array<Address>;
    let userProfileData: Array<User>;

    const {
      name,
      email,
      password,
      phone,
      userType,
      cpf,
      cnpj,
      ...addressData
    } = req.validated;

    let { address, city, state, country, ...userData } = req.validated;

    if (Object.keys(userData).length === 0) {
      userProfileData = await new UserRepository().findUserProfile(
        req.userAuth.user.id
      );
      const { ...user } = userProfileData[0];
      userData['name'] = user.name;
    }

    const userProfile = await updateProfileService(
      userData,
      req.userAuth.user.id
    );

    if (Object.keys(addressData).length > 0) {
      userAddressProfile = await updateAddressProfileService(
        userProfile.addressId,
        addressData
      );
      userProfile['address'] = [userAddressProfile];
    }
    
    let { addressId, isActive, ...updatedUserProfile } = userProfile;
    updatedUserProfile['address'] =
      await new AddressRepository().getAddressById(userProfile.addressId);

    if (updatedUserProfile.userType === 'cliente') {
      delete updatedUserProfile.cnpj;
    } else {
      delete updatedUserProfile.cpf;
    }

    return res.status(200).json(updatedUserProfile);
  } catch (err: any) {
    return handleError(err, res);
  }
};

export default updateUserProfileController;
