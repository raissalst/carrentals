import { Router } from 'express';
import { validateAuth, validateAdmin } from '../../middlewares';
import { getRentalByIdController } from '../../controllers';
import { getAllRentalsController } from '../../controllers';

const rentalRoute = Router();

rentalRoute.get('', validateAuth, validateAdmin, getAllRentalsController);

rentalRoute.get('/:id', validateAuth, validateAdmin, getRentalByIdController);

export default rentalRoute;
