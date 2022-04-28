import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './routes';
import { handleError } from './utils';
import swaggerUiExpress from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api', router);
app.use((err: any, _: Request, res: Response, __: NextFunction) => {
  return handleError(err, res);
});
app.use(
  '/api/docs',
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDocument)
);

export default app;
