import { Router } from 'express';
import updateIsActiveUser from '../../controllers/users/updateIsActiveUser.controller';
import {
  getUserFromQueryId,
  validateAdmin,
  validateAuth,
} from '../../middlewares';

const userRoute = Router();

userRoute.patch(
  '/:id',
  validateAuth,
  validateAdmin,
  getUserFromQueryId,
  updateIsActiveUser
);

export default userRoute;
