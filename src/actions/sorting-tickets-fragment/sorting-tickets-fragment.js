import settings from '../settings';
import { comparePrice, compareDuration } from '../helper';

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

    if (newAcc.length < settings.PAGE_ITEMS_NUMBER) {
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

const sortedTicketsFragment = (tickets) => {
  return {
    type: 'SORTED_TICKETS_FRAGMENT',
    tickets,
  };
};

const sortingTicketsFragment = () => {
  return (dispatch, getState) => {
    const { switchKeys } = getState();

    if (switchKeys.length) {
      const tickets = [...getState().queryTickets.data];

      if (switchKeys.some((el) => el === 'cheapest')) {
        sortFragment(tickets, comparePrice);
      }

      if (switchKeys.some((el) => el === 'fastest')) {
        sortFragment(tickets, compareDuration);
      }

      dispatch(sortedTicketsFragment(tickets));
    }
  };
};

export default sortingTicketsFragment;
