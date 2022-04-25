import { DeleteResult } from "typeorm";
import { Request, Response } from "express";
import { UserRepository } from "../../repositories";
import { handleError } from '../../utils';

export const deleteUserProfile = async (req: Request, res: Response) => {
    try {

        const deleteUser: DeleteResult = await new UserRepository().deleteUser(req.userAuth.user.id);
      
        res.status(200).json({ message: "User deleted with success" });

    } catch (err) {
        return handleError(err, res);
    }

};

export default deleteUserProfile;

// import { Request, Response } from 'express';
// import { getUserProfileService } from '../../services';
// import { handleError } from '../../utils';

// const getUserProfileController = async (req: Request, res: Response) => {
//   try {
//     const userProfile = await getUserProfileService(req.userAuth.user.id);
//     return res.status(200).json(userProfile);
//   } catch (err: any) {
//     return handleError(err, res);
//   }
// };

// export default getUserProfileController;