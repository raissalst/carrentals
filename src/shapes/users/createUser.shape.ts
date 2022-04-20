import * as yup from 'yup';
import bcrypt from 'bcrypt';
import { titleStringUtil } from '../../utils';

const createUserShape = yup.object().shape({
  name: yup
    .string()
    .transform((value) => titleStringUtil(value))
    .required(),
  email: yup.string().email().lowercase().required(),
  password: yup
    .string()
    .min(4, 'Password must have at least 4 digits.')
    .transform((pwd) => bcrypt.hashSync(pwd, 10))
    .required(),
  cpf: yup
    .string()
    .matches(
      /[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}/,
      'Invalid CPF. CPF must be sent as XXX.XXX.XXX-XX.'
    )
    .optional(),
  cnpj: yup
    .string()
    .matches(
      /[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2}/,
      'Invalid CNPJ. CNPJ must be sent as XX.XXX.XXX/XXXX-XX.'
    )
    .optional(),
  phone: yup
    .string()
    .max(
      13,
      'Invalid Phone Number. Phone must be sent as DDI + DDD + Phone number. Example: DDI Brazil (55) + DDD Rio de Janeiro (21) + Phone number = 5521976542398.'
    )
    .required(),
  userType: yup.mixed().oneOf(['cliente', 'empresa', 'admin']).required(),
  isActive: yup.boolean().default(() => true),
  address: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  country: yup.string().required(),
});

export default createUserShape;
