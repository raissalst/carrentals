import { Router } from 'express';
import {
  validateAuth,
  validateAdmin,
  validateCompany,
  validateShape,
  verifyCarOwner,
} from '../../middlewares';
import {
  getRentalByIdController,
  returnCarController,
} from '../../controllers';
import { getAllRentalsController } from '../../controllers';
import { returnCarShape } from '../../shapes';

const rentalRoute = Router();

rentalRoute.get('', validateAuth, validateAdmin, getAllRentalsController);

rentalRoute.get('/:id', validateAuth, validateAdmin, getRentalByIdController);

rentalRoute.post(
  '/:id',
  validateShape(returnCarShape),
  validateAuth,
  validateCompany,
  verifyCarOwner,
  returnCarController
);

export default rentalRoute;
