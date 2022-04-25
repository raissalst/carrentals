import { Router } from 'express';
import carRoute from './cars';
import userRoute from './users';

const route = Router();

route.use('/cars', carRoute);

route.use('/users', userRoute);

export default route;
