import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createTestimonial } from 'apiSdk/testimonials';
import { Error } from 'components/error';
import { testimonialValidationSchema } from 'validationSchema/testimonials';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PortfolioInterface } from 'interfaces/portfolio';
import { getPortfolios } from 'apiSdk/portfolios';
import { TestimonialInterface } from 'interfaces/testimonial';

function TestimonialCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TestimonialInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTestimonial(values);
      resetForm();
      router.push('/testimonials');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TestimonialInterface>({
    initialValues: {
      content: '',
      author: '',
      portfolio_id: (router.query.portfolio_id as string) ?? null,
    },
    validationSchema: testimonialValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Testimonial
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="content" mb="4" isInvalid={!!formik.errors?.content}>
            <FormLabel>Content</FormLabel>
            <Input type="text" name="content" value={formik.values?.content} onChange={formik.handleChange} />
            {formik.errors.content && <FormErrorMessage>{formik.errors?.content}</FormErrorMessage>}
          </FormControl>
          <FormControl id="author" mb="4" isInvalid={!!formik.errors?.author}>
            <FormLabel>Author</FormLabel>
            <Input type="text" name="author" value={formik.values?.author} onChange={formik.handleChange} />
            {formik.errors.author && <FormErrorMessage>{formik.errors?.author}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<PortfolioInterface>
            formik={formik}
            name={'portfolio_id'}
            label={'Select Portfolio'}
            placeholder={'Select Portfolio'}
            fetcher={getPortfolios}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'testimonial',
  operation: AccessOperationEnum.CREATE,
})(TestimonialCreatePage);
