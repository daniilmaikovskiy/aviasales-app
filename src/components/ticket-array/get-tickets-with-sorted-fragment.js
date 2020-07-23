const comparePrice = ({ price: price1 }, { price: price2 }) => {
  if (price1 < price2) {
    return -1;
  }

  if (price1 > price2) {
    return 1;
  }

  return 0;
};

const compareDuration = ({ fullDuration: duration1 }, { fullDuration: duration2 }) => {
  if (duration1 < duration2) {
    return -1;
  }

  if (duration1 > duration2) {
    return 1;
  }

  return 0;
};

const PAGE_ITEMS_NUMBER = 5;

const sortFragment = (arr, compareFn) => {
  const fragmentData = arr.reduce((acc, el, index) => {
    let element = { el, index };

    if (!acc.length) {
      return [element];
    }

    const newAcc = acc.map((accElement) => {
      const compareResult = compareFn(element.el, accElement.el);

      if (compareResult === -1) {
        const result = element;
        element = accElement;
        return result;
      }

      return accElement;
    });

    if (newAcc.length < PAGE_ITEMS_NUMBER) {
      newAcc.push(element);
    }

    return newAcc;
  }, []);

  fragmentData.forEach(({ index }, i) => {
    const tmp = arr[index];
    // eslint-disable-next-line no-param-reassign
    arr[index] = arr[i];
    // eslint-disable-next-line no-param-reassign
    arr[i] = tmp;
  });
};

const getTicketsWithSortedFragment = (tickets, switchKeys) => {
  if (switchKeys.length) {
    const ticketsClone = [...tickets];

    if (switchKeys.some((el) => el === 'cheapest')) {
      sortFragment(ticketsClone, comparePrice);
    }

    if (switchKeys.some((el) => el === 'fastest')) {
      sortFragment(ticketsClone, compareDuration);
    }

    return ticketsClone;
  }

  return tickets;
};

export default getTicketsWithSortedFragment;
