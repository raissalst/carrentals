import { Router } from 'express';

import {
  createCarController,
  rentACarController,
  getCarByIdController,
  updateIsActiveCarController,
  updateCarController,
} from '../../controllers';

import {
  validateAuth,
  validateCompany,
  validateCustomer,
  validateShape,
} from '../../middlewares';

import {
  createCarShape,
  updateCarShape,
  createCarRentShape,
} from '../../shapes';

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

carRoute.post(
  '/:id',
  validateShape(createCarRentShape),
  validateAuth,
  validateCustomer,
  rentACarController
);
carRoute.get('/:id', validateAuth, getCarByIdController);

export default carRoute;
