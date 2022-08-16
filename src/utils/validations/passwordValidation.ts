import * as Yup from 'yup';

const PasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password minimal terdiri dari 6 karakter!')
    .required('Password harus diisi!'),
  confirmPassword: Yup.string()
    .required('Konfirmasi password harus diisi!')
    .when('password', (password, schema) => {
      return schema.test({
        test: (confirmPassword: string) => confirmPassword === password,
        message: 'Konfirmasi password tidak cocok',
      });
    }),
});

export default PasswordValidationSchema;
