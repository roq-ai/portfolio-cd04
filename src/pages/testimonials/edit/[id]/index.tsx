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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getTestimonialById, updateTestimonialById } from 'apiSdk/testimonials';
import { Error } from 'components/error';
import { testimonialValidationSchema } from 'validationSchema/testimonials';
import { TestimonialInterface } from 'interfaces/testimonial';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PortfolioInterface } from 'interfaces/portfolio';
import { getPortfolios } from 'apiSdk/portfolios';

function TestimonialEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<TestimonialInterface>(
    () => (id ? `/testimonials/${id}` : null),
    () => getTestimonialById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: TestimonialInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateTestimonialById(id, values);
      mutate(updated);
      resetForm();
      router.push('/testimonials');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<TestimonialInterface>({
    initialValues: data,
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
            Edit Testimonial
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'testimonial',
  operation: AccessOperationEnum.UPDATE,
})(TestimonialEditPage);
