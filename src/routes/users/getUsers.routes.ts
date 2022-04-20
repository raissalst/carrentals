import { Router } from 'express'
import { getUserController } from '../../controllers';
import { validateAdmin } from '../../middlewares';

const getUserRouter = Router();

getUserRouter.get(
    '/api/users',
    validateAdmin,
    getUserController,
)

export default getUserRouter;