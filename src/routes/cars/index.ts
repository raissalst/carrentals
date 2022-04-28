import { Router } from 'express';

import {
  createCarController,
  rentACarController,
  getCarByIdController,
  updateIsActiveCarController,
  updateCarController,
  getCarsController,
} from '../../controllers';

import {
  validateAdmin,
  validateAuth,
  validateCompany,
  validateCustomerOrCompany,
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

carRoute.get('/', validateAuth, getCarsController);

carRoute.post(
  '/:id',
  validateShape(createCarRentShape),
  validateAuth,
  validateCustomer,
  rentACarController
);
carRoute.get('/:id', validateAuth, getCarByIdController);

export default carRoute;
