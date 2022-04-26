import { Router } from 'express';

import { validateAuth, validateAdmin } from '../../middlewares';

import { getAllRentalsController } from '../../controllers';

const rentalRoute = Router();

rentalRoute.get('', validateAuth, validateAdmin, getAllRentalsController);

export default rentalRoute;
