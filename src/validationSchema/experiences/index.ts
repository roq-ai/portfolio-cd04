import * as yup from 'yup';

export const experienceValidationSchema = yup.object().shape({
  company_name: yup.string().required(),
  role: yup.string().required(),
  description: yup.string(),
  portfolio_id: yup.string().nullable(),
});
