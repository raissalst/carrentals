import * as yup from 'yup';

const updateCarShape = yup.object().shape({
    currentMileage: yup.number().optional(),
    rentalPricePerDay: yup.number().optional(),
    availableToRent: yup.boolean().default(() => true).optional(),
    isActive: yup.boolean().default(() => true).optional(),
})

export default updateCarShape;