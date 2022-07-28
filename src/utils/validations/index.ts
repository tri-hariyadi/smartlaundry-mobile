export const validate = (getValidationSchema: any) => {
  return (values: any) => {
    const validationSchema = getValidationSchema(values);
    try {
      validationSchema.validateSync(values, { abortEarly: false });
      return {};
    } catch (error) {
      return getErrorsFromValidationError(error);
    }
  };
};

const getErrorsFromValidationError = (validationError: any) => {
  const FIRST_ERROR = 0;
  return validationError.inner.reduce((errors: any, error: any) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    };
  }, {});
};

export { default as loginValidation } from './loginValidation';
