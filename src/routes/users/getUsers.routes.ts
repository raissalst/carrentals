import { Router } from 'express'
import { getUserController } from '../../controllers';
import { validateAdmin, verifyUserType } from '../../middlewares';

const getUserRouter = Router();

getUserRouter.get(
    '/users',
    verifyUserType,
    validateAdmin,
    getUserController,
)

export default getUserRouter;