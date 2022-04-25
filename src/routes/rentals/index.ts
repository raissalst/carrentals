import { Router } from 'express';

import { validateAuth, validateAdmin } from '../../middlewares';

import { getAllRentals } from '../../controllers';

const rentalRoute = Router();

rentalRoute.get('', validateAuth, validateAdmin, getAllRentals);
