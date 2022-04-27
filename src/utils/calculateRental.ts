import { newDateFormat } from './';

const calculateRent = (start, end, price) => {
  const returnDate = newDateFormat(start);
  const startDate = newDateFormat(end);
  let diff = Math.abs(returnDate.getTime() - startDate.getTime());
  let days = Math.ceil(diff / (1000 * 3600 * 24));

  return days * price;
};

export default calculateRent;
