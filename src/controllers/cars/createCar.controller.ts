import { Request, Response } from 'express';
import { CarRepository } from '../../repositories';

const createCarController = async (req: Request, res: Response) => {
  const { userAuth, validated } = req;

  console.log(userAuth.user.id);
  const data = validated.cars.map((car) => {
    return { ...car, companyId: userAuth.user.id };
  });

  const response = await new CarRepository().saveMultipleCars(data);

  res.status(201).json(response);
};

export default createCarController;
