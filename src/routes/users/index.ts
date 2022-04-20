import { Router } from 'express';
import updateIsActiveUser from '../../controllers/users/updateIsActiveUser.controller';
import { getUserController } from '../../controllers';
import {
  getUserFromQueryId,
  validateAdmin,
  validateAuth,
  verifyUserType
} from '../../middlewares';

const userRoute = Router();

userRoute.patch(
  '/:id',
  validateAuth,
  validateAdmin,
  getUserFromQueryId,
  updateIsActiveUser
);

userRoute.get(
  '/users',
  verifyUserType,
  validateAdmin,
  getUserController,
)

export default userRoute;
