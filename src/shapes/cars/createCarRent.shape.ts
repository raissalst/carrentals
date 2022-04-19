import * as yup from 'yup';
const createCarRentShape = yup.object().shape({
  rentalStartDate: yup
    .date()
    .required()
    .default(() => new Date()),
  rentalReturnDate: yup.date().required(),
});

export default createCarRentShape;
