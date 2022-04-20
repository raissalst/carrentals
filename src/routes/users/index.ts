import { Router } from 'express';
<<<<<<< HEAD
import { loginUserController } from '../../controllers';
import { validateShape, validateAuth } from '../../middlewares';
import { createUserShape, loginUserShape } from '../../shapes';

const userRoute = Router();

userRoute.post('/login', validateShape(loginUserShape), loginUserController);
=======
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
>>>>>>> develop

export default userRoute;
