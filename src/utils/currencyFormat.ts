const currencyFormat = (value: string) => {
  if (!value) {
    return value;
  }
  let onlyNums = value.replace(/[^\d]/g, '').toString(),
    split = onlyNums.split(','),
    sisa = split[0].length % 3,
    priceFormat = split[0].substr(0, sisa),
    thousand = split[0].substr(sisa).match(/\d{1,3}/gi);

  if (thousand) {
    let separator = sisa ? '.' : '';
    priceFormat += separator + thousand.join('.');
  }

  priceFormat = split[1] !== undefined ? priceFormat + ',' + split[1] : priceFormat;
  return `Rp. ${priceFormat}`;
};

export default currencyFormat;
