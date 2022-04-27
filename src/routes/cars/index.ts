import { Router } from 'express';
import {
  createCarController,
  getCarByIdController,
  updateIsActiveCarController,
  getCarsController,
} from '../../controllers';

import {
  validateAdmin,
  validateAuth,
  validateCompany,
  validateCustomerOrCompany,
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

carRoute.get(
  '/',
  validateAuth,
  getCarsController
);
carRoute.get('/:id', validateAuth, getCarByIdController);

export default carRoute;
