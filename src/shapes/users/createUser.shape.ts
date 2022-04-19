import * as yup from "yup";
import bcrypt from 'bcrypt';
import { titleStringUtil } from "../../utils";

const createUserShape = yup.object().shape({
  name: yup.string().transform((value) => titleStringUtil(value)).required(),
  email: yup.string().email().lowercase().required(),
  password: yup.string().transform((pwd) => bcrypt.hashSync(pwd, 10)).required(),
  cpf: yup.string().matches(/[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}/).optional(),
  cnpj: yup.string().matches(/[0-9]{2}\.[0-9]{3}\.[0-9]{3}\[0-9]{4}\-[0-9]{2}/).optional(),
  phone: yup.string().required(),
  userType: yup.mixed().oneOf(['cliente', 'empresa', 'admin']).required(),
  isActive: yup.boolean().default(() => true),
  address: yup.string().required(),
	city: yup.string().required(),
	state: yup.string().required(),
	country: yup.string().required(),
});

export default createUserShape;