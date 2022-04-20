import { Router } from 'express';
import { createUserController } from "../../controllers";
import { createUserShape } from "../../shapes";
import updateIsActiveUser from '../../controllers/users/updateIsActiveUser.controller';
import {
  validateShape,
  getUserFromQueryId,
  validateAdmin,
  validateAuth,
  verifyUserType,
} from '../../middlewares';

const userRoute = Router();

userRoute.post(
  '/',
  validateShape(createUserShape),
  verifyUserType,
  createUserController
)

userRoute.patch(
  '/:id',
  validateAuth,
  validateAdmin,
  getUserFromQueryId,
  updateIsActiveUser
);

export default userRoute;
