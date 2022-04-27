import { Router } from 'express';
import carRoute from './cars';
import userRoute from './users';
import rentalRoute from './rentals';
const route = Router();

route.use('/cars', carRoute);

route.use('/users', userRoute);

route.use('/rentals', rentalRoute);

export default route;
