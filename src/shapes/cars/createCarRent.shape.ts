import * as yup from 'yup';
import { v4 } from 'uuid';
const createCarRentShape = yup.object().shape({
  id: yup
    .string()
    .required()
    .default(() => v4()),
  rentalStartDate: yup
    .date()
    .required()
    .default(() => new Date()),
  rentalReturnDate: yup.date().required(),
});

export default createCarRentShape;
