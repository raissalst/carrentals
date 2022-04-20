import { Router } from 'express';
import userRoute from './users';

const route = Router();

route.use('/users', userRoute);

export default route;
