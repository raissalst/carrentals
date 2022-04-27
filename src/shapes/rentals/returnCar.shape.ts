import * as yup from 'yup';

const returnCarShape = yup.object().shape({
  mileageRun: yup
    .number()
    .positive('mileageRun must be positive')
    .required('mileageRun is required'),
});

export default returnCarShape;
