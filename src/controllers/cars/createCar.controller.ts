import { Request, Response } from 'express';

const createCarController = (req: Request, res: Response) => {
  res.status(201).json();
};

export default createCarController;
