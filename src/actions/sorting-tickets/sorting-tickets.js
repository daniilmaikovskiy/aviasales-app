import { comparePrice, compareDuration } from '../helper';

const sortedTickets = (tickets) => {
  return {
    type: 'SORTED_TICKETS',
    tickets,
  };
};

const sortingTickets = () => {
  return (dispatch, getState) => {
    const { switchKeys } = getState();

    if (switchKeys.length) {
      const tickets = [...getState().queryTickets.data];

      if (switchKeys.some((el) => el === 'cheapest')) {
        tickets.sort(comparePrice);
      }

      if (switchKeys.some((el) => el === 'fastest')) {
        tickets.sort(compareDuration);
      }

      dispatch(sortedTickets(tickets));
    }
  };
};

export default sortingTickets;
