import { newDateFormat } from './';

const calculateRent = (start, end, price) => {
  let diff = Math.abs(end.getTime() - start.getTime());
  let days = Math.ceil(diff / (1000 * 3600 * 24));

  return days * price;
};

export default calculateRent;
