import { Request, Response } from 'express';
import { Car } from '../../entities/Car';
import { CarRepository } from '../../repositories';

const createCarController = async (req: Request, res: Response) => {
  const { userAuth, validated } = req;

  const data = validated.cars.map((car: Car) => {
    return { ...car, company: userAuth.user.id };
  });

  const response = await new CarRepository().saveMultipleCars(data);

  res.status(201).json(response);
};

export default createCarController;
