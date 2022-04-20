import { Router } from 'express';
import { createUserController } from "../../controllers";
import { createUserShape } from "../../shapes";
import updateIsActiveUser from '../../controllers/users/updateIsActiveUser.controller';
import { getUserController } from '../../controllers';
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

userRoute.get(
  '/',
  validateAuth,
  verifyUserType,
  validateAdmin,
  getUserController,
)

export default userRoute;
