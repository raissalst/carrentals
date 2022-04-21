import { Request, Response } from "express";
import { getUserProfileService } from "../../services";
import { handleError } from "../../utils";


const getUserProfileController = async (req: Request, res: Response) => {
  
  try {
    const userProfile = await getUserProfileService(req.userAuth.user.id)
    return res.status(200).json(userProfile)
    
  } catch (err: any) {
    return handleError(err, res)
  }
}

export default getUserProfileController;
