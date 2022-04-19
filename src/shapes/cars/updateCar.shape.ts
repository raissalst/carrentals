import * as yup from 'yup';

const updateCarShape = yup.object().shape({
    name: yup.string().optional(),
    model: yup.string().optional(),
    brand: yup.string().optional(),
    year: yup.string().optional(),
    color: yup.string().optional(),
    doors: yup.mixed().oneOf([2, 3, 4]).optional(),
    fuelType: yup.mixed().oneOf(["gasolina", "flex", "hibrido", "eletrico", "diesel", "alcool"]).optional(),
    plate: yup.string().optional(),
    gear: yup.mixed().oneOf(["manual", "automatico"]).optional(),
    chassis: yup.string().optional(),
    currentMileage: yup.number().optional(),
    rentalPricePerDay: yup.number().optional(),
    availableToRent: yup.boolean().optional(),
    isActive: yup.boolean().optional(),
})

export default updateCarShape;