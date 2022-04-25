import { UserRepository } from '../../repositories';

interface IAvailable {
  availableToRent: string;
}

const getProfileCarsService = async (id: string, availableData: IAvailable) => {
  const user = await new UserRepository().findUserCars(id);

  const searchQuery: string = availableData.availableToRent;
  let responseCars = user[0].cars;

  if (Object.keys(availableData).length !== 0) {
    if (searchQuery.toLowerCase().trim() === 'true') {
      responseCars = responseCars.filter((car) => car.availableToRent);
    } else if  (searchQuery.toLowerCase().trim() === 'false'){
      responseCars = responseCars.filter((car) => !car.availableToRent);
    }
  }

  return responseCars;
};

export default getProfileCarsService;
