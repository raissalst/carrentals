import { Request, Response, NextFunction } from 'express';
import { AnySchema } from 'yup';

const validateShape =
  (shape: AnySchema) => async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const validated = await shape.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      req.validated = validated;
      return next();
      
    } catch (e: any) {
      return res.status(400).json({ error: e.errors });
    }
  };

export default validateShape;
