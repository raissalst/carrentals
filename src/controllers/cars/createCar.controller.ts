import { Request, Response } from 'express';

const createCarController = (req: Request, res: Response) => {
  res.status(201).json(req.validated);
};

export default createCarController;
