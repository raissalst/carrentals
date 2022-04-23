import { User } from '../../entities/User';
import { UserRepository } from '../../repositories';

const updateProfileService = async (updateData: User, id: string) => {

  try {
    const user = await new UserRepository().updateUser(updateData, id);
    const { password, ...updatedProfile } = user.raw[0];

    return updatedProfile;
  } catch (err: any) {    
    return err;
  }
};

export default updateProfileService;
