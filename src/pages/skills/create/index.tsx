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
import { createSkill } from 'apiSdk/skills';
import { Error } from 'components/error';
import { skillValidationSchema } from 'validationSchema/skills';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PortfolioInterface } from 'interfaces/portfolio';
import { getPortfolios } from 'apiSdk/portfolios';
import { SkillInterface } from 'interfaces/skill';

function SkillCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SkillInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSkill(values);
      resetForm();
      router.push('/skills');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SkillInterface>({
    initialValues: {
      name: '',
      portfolio_id: (router.query.portfolio_id as string) ?? null,
    },
    validationSchema: skillValidationSchema,
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
            Create Skill
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
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
  entity: 'skill',
  operation: AccessOperationEnum.CREATE,
})(SkillCreatePage);
