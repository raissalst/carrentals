import { Router } from 'express';
import { loginUserController } from '../../controllers';
import { validateShape, validateAuth } from '../../middlewares';
import { createUserShape, loginUserShape } from '../../shapes';

const userRoute = Router();

userRoute.post('/login', validateShape(loginUserShape), loginUserController);

export default userRoute;
