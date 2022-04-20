import { Router } from 'express';
import {
  loginUserController,
  updateIsActiveUserController,
} from '../../controllers';
import {
  validateShape,
  validateAuth,
  getUserFromQueryId,
  validateAdmin,
} from '../../middlewares';
import { createUserShape, loginUserShape } from '../../shapes';

const userRoute = Router();

userRoute.post('/login', validateShape(loginUserShape), loginUserController);

userRoute.patch(
  '/:id',
  validateAuth,
  validateAdmin,
  getUserFromQueryId,
  updateIsActiveUserController
);

export default userRoute;
