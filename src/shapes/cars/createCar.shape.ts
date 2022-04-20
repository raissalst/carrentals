import * as yup from 'yup';

const createCarShape = yup.object().shape({
  cars: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      model: yup.string().required(),
      brand: yup.string().required(),
      year: yup.string().required(),
      color: yup.string().required(),
      doors: yup.mixed().oneOf([2, 3, 4]).required(),
      fuelType: yup
        .mixed()
        .oneOf(['gasolina', 'flex', 'hibrido', 'eletrico', 'diesel', 'alcool'])
        .required(),
      plate: yup
        .string()
        .max(7, 'Plate must have maximum of 7 digits.')
        .required(),
      gear: yup.mixed().oneOf(['manual', 'automatico']).required(),
      chassis: yup.string().required(),
      currentMileage: yup.number().required(),
      rentalPricePerday: yup.number().required(),
      availableToRent: yup
        .boolean()
        .default(() => true)
        .optional(),
      isActive: yup
        .boolean()
        .default(() => true)
        .optional(),
    })
  ),
});

export default createCarShape;
