import createUserController from './users/createUser.controller';
import loginUserController from './users/loginUser.controller';
import updateIsActiveUserController from './users/updateIsActiveUser.controller';
import deleteUserProfile from './users/deleteUserProfile';
import getUserController from './users/getUser.controller';
import updateUserProfileController from './users/updateUserProfile.controller';
import getUserProfileController from './users/getUserProfile.controller';
import getUserProfileCarsController from './users/getUserProfileCars.controller';
import getUserByIdController from './users/getUserById.controller';
import createCarController from './cars/createCar.controller';
import updateIsActiveCarController from './cars/updateIsActiveCar.controller';
import getCarsController from './cars/getCars.controller'
import getUserRentalsController from './users/getUserRentals.controller';
import rentACarController from './rentals/rentACar.controller';
import getCarByIdController from './cars/getCarById.controller';
import getRentalByIdController from './rentals/getRentalById';

import getAllRentalsController from './rentals/getAllRentals.controller';

export {
  createUserController,
  loginUserController,
  updateIsActiveUserController,
  deleteUserProfile,
  getUserController,
  updateUserProfileController,
  getUserProfileController,
  getUserProfileCarsController,
  getUserByIdController,
  createCarController,
  getAllRentalsController,
  updateIsActiveCarController,
  getCarsController,
  getUserRentalsController,
  rentACarController,
  getCarByIdController,
  getRentalByIdController,
};
