import { Request, Response } from 'express';
import { getCarsService } from '../../services';
import { handleError } from '../../utils';

const getCarsController = async (_: Request, res: Response) => {
  try {
    const cars = await getCarsService();
    return res.status(200).json(cars);
  } catch (err: any) {
    return handleError(err, res);
  }
};

export default getCarsController;


// - [GET] → *visualizar dados públicos (tudo menos placa, chassis, km e isActive) de todos os carros disponíveis (available=true e active=true) cadastrados na plataforma (autorização para admin, empresa e cliente)🔒*