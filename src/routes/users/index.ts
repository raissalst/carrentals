import { Router } from 'express';
import {
  loginUserController,
  updateIsActiveUserController,
  createUserController,
  deleteUserProfile
} from '../../controllers';

import {
  validateShape,
  getUserFromQueryId,
  validateAdmin,
  validateAuth,
  verifyUserType,
} from '../../middlewares';

import { createUserShape, loginUserShape } from '../../shapes';

const userRoute = Router();

userRoute.post('/login', validateShape(loginUserShape), loginUserController);
userRoute.post(
  '/',
  validateShape(createUserShape),
  verifyUserType,
  createUserController
);

userRoute.patch(
  '/:id',
  validateAuth,
  validateAdmin,
  getUserFromQueryId,
  updateIsActiveUserController
);

userRoute.delete(
  '/profile',
  // '/:id',
  validateAuth,
  getUserFromQueryId,
  deleteUserProfile
);

export default userRoute;

