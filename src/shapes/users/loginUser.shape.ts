import * as yup from 'yup';

const loginUserShape = yup.object().shape({
  email: yup.string().email().lowercase().required(),
  password: yup.string().required(),
});

export default loginUserShape;
