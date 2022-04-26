import { Request, Response } from 'express';

const rentACarController = (req: Request, res: Response) => {
  res.status(200).json();
};

export default rentACarController;
