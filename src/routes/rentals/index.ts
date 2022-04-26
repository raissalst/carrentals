import { Router } from 'express';

import { validateAuth, validateAdmin } from '../../middlewares';

import { getRentalByIdController } from '../../controllers';

const rentalRoute = Router();

rentalRoute.get('/:id', validateAuth, validateAdmin, getRentalByIdController);

export default rentalRoute;
