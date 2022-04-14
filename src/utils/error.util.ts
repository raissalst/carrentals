import { Response } from 'express';

class ErrorHandler {
  public status: number;
  public message: any;

  constructor(status: number, message: any) {
    this.status = status;
    this.message = message;
  }
}

const handleError = (err: any, res: Response) => {
  if (err instanceof ErrorHandler) {
    const { status, message } = err;

    return res.status(status).json({ error: message });
  }

  return res.status(400).json(err);
};

export { ErrorHandler, handleError };
