import * as Yup from 'yup';

const RegisterValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'Nama Lengkap minimal terdiri dari 3 karakter!')
    .required('Nama Lengkap harus diisi!'),
  email: Yup.string()
    .email('Email tidak valid')
    .required('Email harus diisi!'),
  phoneNumber: Yup.string()
    .min(9, 'Nomor HP hanya boleh 9 - 15 karakter!')
    .max(15, 'Nomor HP hanya boleh 9 - 15 karakter!')
    .required('Nomor HP harus diisi!'),
  password: Yup.string()
    .min(6, `Password minimal terdiri dari ${6} karakter!`)
    .required('Password harus diisi!'),
});

export default RegisterValidationSchema;
