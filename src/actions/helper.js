export const comparePrice = ({ price: price1 }, { price: price2 }) => {
  if (price1 < price2) {
    return -1;
  }

  if (price1 > price2) {
    return 1;
  }

  return 0;
};

export const compareDuration = ({ fullDuration: duration1 }, { fullDuration: duration2 }) => {
  if (duration1 < duration2) {
    return -1;
  }

  if (duration1 > duration2) {
    return 1;
  }

  return 0;
};

const helper = {
  comparePrice,
  compareDuration,
};

export default helper;
