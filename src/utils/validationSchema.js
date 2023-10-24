import * as yup from 'yup';

const userValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('not erquired')
    .max(255, 'max lenght 255 symbols')
    .min(1, 'Min 1 symbol'),
  email: yup
    .string()
    .required('not erquired')
    .email('not valid email')
    .max(254, 'max lenght 254 symbols')
    .min(1, 'Min 1 symbol'),
  birthday_date: yup
    .string()
    .required('not erquired')
    .matches(
      /^(\d{4})-(\d{2})-(\d{2})$/,
      'YYYY-MM-DD'
    ),
  phone_number: yup
    .string()
    .required('not erquired')
    .max(20, 'Max 20 symbols')
    .min(1, 'Min 1 symbol'),
  address: yup.string().required('not required').min(1, 'Min 1 symbol'),
});

export default userValidationSchema;
