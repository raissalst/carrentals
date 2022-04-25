import { Router } from 'express';
import { createCarController } from '../../controllers';
import {
  validateAuth,
  validateCompany,
  validateShape,
} from '../../middlewares';
import { createCarShape } from '../../shapes';

const carRoute = Router();

carRoute.post(
  '/',
  validateShape(createCarShape),
  validateAuth,
  validateCompany,
  createCarController
);

export default carRoute;
