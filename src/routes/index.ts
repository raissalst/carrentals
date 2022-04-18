import { Request, Response, Router } from 'express';
import UserRepository from '../repositories/user';

const router = Router();

router.get('', async (req: Request, res: Response) => {
  const users = await new UserRepository().retrieveUsers();

  res.status(200).json(users);
});

export default router;
