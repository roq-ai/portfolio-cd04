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
import { getExperienceById, updateExperienceById } from 'apiSdk/experiences';
import { Error } from 'components/error';
import { experienceValidationSchema } from 'validationSchema/experiences';
import { ExperienceInterface } from 'interfaces/experience';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PortfolioInterface } from 'interfaces/portfolio';
import { getPortfolios } from 'apiSdk/portfolios';

function ExperienceEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ExperienceInterface>(
    () => (id ? `/experiences/${id}` : null),
    () => getExperienceById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ExperienceInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateExperienceById(id, values);
      mutate(updated);
      resetForm();
      router.push('/experiences');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ExperienceInterface>({
    initialValues: data,
    validationSchema: experienceValidationSchema,
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
            Edit Experience
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
            <FormControl id="company_name" mb="4" isInvalid={!!formik.errors?.company_name}>
              <FormLabel>Company Name</FormLabel>
              <Input
                type="text"
                name="company_name"
                value={formik.values?.company_name}
                onChange={formik.handleChange}
              />
              {formik.errors.company_name && <FormErrorMessage>{formik.errors?.company_name}</FormErrorMessage>}
            </FormControl>
            <FormControl id="role" mb="4" isInvalid={!!formik.errors?.role}>
              <FormLabel>Role</FormLabel>
              <Input type="text" name="role" value={formik.values?.role} onChange={formik.handleChange} />
              {formik.errors.role && <FormErrorMessage>{formik.errors?.role}</FormErrorMessage>}
            </FormControl>
            <FormControl id="description" mb="4" isInvalid={!!formik.errors?.description}>
              <FormLabel>Description</FormLabel>
              <Input type="text" name="description" value={formik.values?.description} onChange={formik.handleChange} />
              {formik.errors.description && <FormErrorMessage>{formik.errors?.description}</FormErrorMessage>}
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
  entity: 'experience',
  operation: AccessOperationEnum.UPDATE,
})(ExperienceEditPage);
