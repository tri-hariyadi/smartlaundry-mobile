const OrderValidation = (values: any) => {
  const errors:Partial<any> = {};

  if (!values.addressName) {
    errors.addressName = 'Nama alamat harus diisi';
  }

  if (!values.address) {
    errors.address = 'Alamat harus diisi';
  }

  if (!values.detailAddress) {
    errors.detailAddress = 'Detail alamat harus diisi';
  }

  return errors;
};

export default OrderValidation;
