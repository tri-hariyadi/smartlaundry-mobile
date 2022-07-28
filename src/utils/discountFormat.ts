const discountFormat = (value: string) => {
  const number = value.split('');
  let arrayFormat: Array<number> = [];
  for (let i = number.length - 1; i >= 0; i--) {
    if (arrayFormat.length === 3) arrayFormat = [];
    arrayFormat.push(Number(number[i]));
  }

  return arrayFormat.reverse();
};
//4 0 0 0 0

export default discountFormat;
