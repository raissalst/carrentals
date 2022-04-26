import { Router } from 'express';
import {
  createCarController,
  getCarsController,
  updateIsActiveCarController,
} from '../../controllers';
import getCars from '../../controllers/cars/getCars.controller';
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
  // validateCustomerOrCompany,
  getCarsController
);

export default carRoute;
