import * as yup from 'yup';

const createCarRentShape = yup.object().shape({
  rentalStartDate: yup
    .string()
    .matches(
      /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/,
      'Formato da data a ser enviada: dd/mm/yyyy'
    )
    .required(),
  rentalReturnDate: yup
    .string()
    .matches(
      /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/,
      'Formato da data a ser enviada: dd/mm/yyyy'
    )
    .required(),
});

export default createCarRentShape;
