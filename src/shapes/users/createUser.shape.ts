import * as yup from "yup";
import bcrypt from 'bcrypt';
import { titleStringUtil } from "../../utils";

enum userType {
    'cliente',
    'empresa',
    'admin',
  }

const createUserShape = yup.object().shape({
  name: yup.string().required().transform((value) => titleStringUtil(value)),
  email: yup.string().email().lowercase().required(),
  password: yup.string().transform((pwd) => bcrypt.hashSync(pwd, 10)).required(),
  cpf: yup.string().matches(/[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}/).optional(),
  cnpj: yup.string().matches(/[0-9]{2}\.[0-9]{3}\.[0-9]{3}\[0-9]{4}\-[0-9]{2}/).optional(),
  phone: yup.string().required(),
  userType: yup.mixed<userType>().oneOf(Object.values(userType) as number[]),
  isAdmin: yup
    .boolean()
    .default(() => false)
    .optional(),
    isActive: yup.boolean().default(() => true)
});

export default createUserShape;