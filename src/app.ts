import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './routes';
import getUserRouter from './routes';
import { handleError } from './utils';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api', router);
app.use('/api', getUserRouter);
app.use((err: any, _: Request, res: Response, __: NextFunction) => {
  return handleError(err, res);
});

export default app;
