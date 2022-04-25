import { Router } from 'express';
import { createCarController } from '../../controllers';

const carRoute = Router();

carRoute.post('/', createCarController);

export default carRoute;
