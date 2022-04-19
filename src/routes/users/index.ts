import { Router } from 'express';
import { validateShape } from '../../middlewares';

const userRouter = Router();

userRouter.post(
  '/',
  validateShape(),
  
  
)