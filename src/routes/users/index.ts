import { Router } from 'express';
import {
  loginUserController,
  updateIsActiveUserController,
  createUserController,
  updateUserProfileController,
  getUserProfileController,
  getUserProfileCarsController,
  getUserByIdController,
  getUserRentalsController,
} from '../../controllers';

import {
  validateShape,
  getUserFromQueryId,
  validateAdmin,
  validateAuth,
  verifyUserType,
  validateCompany,
  validateCustomerOrCompany,
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

userRoute.get('/profile', validateAuth, getUserProfileController);

userRoute.get('/:id', validateAuth, getUserByIdController);

userRoute.get(
  '/profile/cars',
  validateAuth,
  validateCompany,
  getUserProfileCarsController
);

userRoute.get(
  '/profile/rentals',
  validateAuth,
  validateCustomerOrCompany,
  getUserRentalsController,
);

export default userRoute;
