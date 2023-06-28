import * as yup from 'yup';

export const testimonialValidationSchema = yup.object().shape({
  content: yup.string().required(),
  author: yup.string().required(),
  portfolio_id: yup.string().nullable(),
});
