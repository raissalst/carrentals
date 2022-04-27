import { Router } from 'express';
import {
  createCarController,
  getCarByIdController,
  updateIsActiveCarController,
  updateCarController,
} from '../../controllers';
import {
  validateAuth,
  validateCompany,
  validateShape,
} from '../../middlewares';
import { createCarShape, updateCarShape } from '../../shapes';

const carRoute = Router();

carRoute.patch(
  '/:id',
  validateShape(updateCarShape),
  validateAuth,
  validateCompany,
  updateCarController
);
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

carRoute.get('/:id', validateAuth, getCarByIdController);

export default carRoute;
