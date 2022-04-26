import { Router } from 'express';
import {
  createCarController,
  rentACarController,
  updateIsActiveCarController,
} from '../../controllers';
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

carRoute.delete(
  '/:id',
  validateAuth,
  validateCompany,
  updateIsActiveCarController
);

carRoute.post('/:id', rentACarController);

export default carRoute;
