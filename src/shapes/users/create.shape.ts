import * as yup from "yup";

enum userType {
    cliente,
    empresa,
    admin,
  }

const createUserShape = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().lowercase().required(),
  password: yup.string().required(),
  cpf: yup.string(),
  cnpj: yup.string(),
  phone: yup.string().required(),
  userType: yup.mixed<userType>().oneOf(Object.values(userType) as number[]),
  isAdmin: yup
    .boolean()
    .default(() => false)
    .optional(),
    isActive: yup.boolean().default(() => true)
});

export default createUserShape;