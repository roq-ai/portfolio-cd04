import * as yup from 'yup';

export const skillValidationSchema = yup.object().shape({
  name: yup.string().required(),
  portfolio_id: yup.string().nullable(),
});
