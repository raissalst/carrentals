import * as yup from "yup";

const createCarShape = yup.object().shape({
    cars: yup.array().of(yup.object().shape({

        name: yup.string().required(),
        model: yup.string().required(),
        brand: yup.string().required(),
        year: yup.string().required(),
        color: yup.string().required(),
        doors: yup.mixed().oneOf([2, 3, 4]),
        fuelType: yup.mixed().oneOf(["gasolina", "flex", "hibrido", "eletrico", "diesel", "alcool"]),
        plate: yup.string().required(),
        gear: yup.mixed().oneOf(["manual", "automatico"]),
        chassis: yup.string().required(),
        currentMileage: yup.number().required(),		
        rentalPricePerday: yup.number().required(),
        availableToRent: yup.bool().default(() => true).optional(),
        isActive: yup.boolean().default(() => true).optional()

    }))
})

export default createCarShape;
