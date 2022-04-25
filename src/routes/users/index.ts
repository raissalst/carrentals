import { Router } from 'express';
import {
  loginUserController,
  updateIsActiveUserController,
  createUserController,
  getUserProfileController,
  getUserProfileCarsController,
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

userRoute.get(
  '/profile',
  validateAuth,
  getUserProfileController
)

userRoute.get(
  '/profile/cars',
  validateAuth,
  getUserProfileCarsController
)

export default userRoute;
