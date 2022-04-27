import { Router } from 'express';
import {
  loginUserController,
  updateIsActiveUserController,
  createUserController,
  deleteUserProfile,
  getUserController,
  updateUserProfileController,
  getUserProfileController,
  getUserProfileCarsController,
  getUserByIdController,
} from '../../controllers';

import {
  validateShape,
  getUserFromQueryId,
  validateAdmin,
  validateAuth,
  verifyUserType,
  validateCompany,
} from '../../middlewares';

import { createUserShape, loginUserShape, updateUserShape } from '../../shapes';

const userRoute = Router();

userRoute.post('/login', validateShape(loginUserShape), loginUserController);
userRoute.post(
  '/',
  validateShape(createUserShape),
  verifyUserType,
  createUserController
);

userRoute.patch(
  '/profile',
  validateAuth,
  validateShape(updateUserShape),
  updateUserProfileController
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

userRoute.get(
  '/profile',
  validateAuth,
  getUserProfileController
);

userRoute.get(
  '/',
  validateAuth,
  // validateAdmin,
  getUserController,
);

userRoute.get('/profile', validateAuth, getUserProfileController);

userRoute.get('/:id', validateAuth, getUserByIdController);

userRoute.get(
  '/profile/cars',
  validateAuth,
  validateCompany,
  getUserProfileCarsController
)

export default userRoute;
