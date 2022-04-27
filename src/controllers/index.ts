import createUserController from './users/createUser.controller';
import loginUserController from './users/loginUser.controller';
import updateIsActiveUserController from './users/updateIsActiveUser.controller';
import getUserController from './users/getUser.controller';
import updateUserProfileController from './users/updateUserProfile.controller';
import getUserProfileController from './users/getUserProfile.controller';
import getUserProfileCarsController from './users/getUserProfileCars.controller';
import getUserByIdController from './users/getUserById.controller';
import createCarController from './cars/createCar.controller';
import updateIsActiveCarController from './cars/updateIsActiveCar.controller';
import getCarByIdController from './cars/getCarById.controller';
import getRentalByIdController from './rentals/getRentalById';

import getAllRentalsController from './rentals/getAllRentals.controller';
import returnCarController from './rentals/returnCar.controller';

export {
  createUserController,
  loginUserController,
  updateIsActiveUserController,
  getUserController,
  updateUserProfileController,
  getUserProfileController,
  getUserProfileCarsController,
  getUserByIdController,
  createCarController,
  getAllRentalsController,
  updateIsActiveCarController,
  getCarByIdController,
  getRentalByIdController,
  returnCarController,
};
