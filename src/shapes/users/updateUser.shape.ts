import * as yup from 'yup';
import bcrypt from 'bcrypt';
import { titleStringUtil } from '../../utils';

const updateUserShape = yup.object().shape({
  name: yup
    .string()
    .transform((value) => titleStringUtil(value))
    .optional(),
  email: yup.string().email().lowercase().optional(),
  password: yup
    .string()
    .transform((pwd) => bcrypt.hashSync(pwd, 10))
    .optional(),
  cpf: yup
    .string()
    .matches(/[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}/)
    .optional(),
  cnpj: yup
    .string()
    .matches(/[0-9]{2}\.[0-9]{3}\.[0-9]{3}\[0-9]{4}\-[0-9]{2}/)
    .optional(),
  phone: yup.string().optional(),
  address: yup.string().optional(),
  city: yup.string().optional(),
  state: yup.string().optional(),
  country: yup.string().optional(),
});

export default updateUserShape;
