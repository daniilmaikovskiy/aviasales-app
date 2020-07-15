import changingVisibleTickets from '../changing-visible-tickets/changing-visible-tickets';

const comparePrice = (a, b) => {
  if (a.price < b.price) {
    return -1;
  }

  if (a.price > b.price) {
    return 1;
  }

  return 0;
};

const compareDuration = (a, b) => {
  if (a.fullDuration < b.fullDuration) {
    return -1;
  }

  if (a.fullDuration > b.fullDuration) {
    return 1;
  }

  return 0;
};

const sortedTickets = (tickets) => {
  return {
    type: 'SORTED_TICKETS',
    tickets,
  };
};

const startedSortingTickets = () => ({ type: 'STARTED_SORTING_TICKETS' });
const endedSortingTickets = () => ({ type: 'ENDED_SORTING_TICKETS' });

const sortingTickets = () => {
  return (dispatch, getState) => {
    const switchKeys = [...getState().switchKeys];

    if (switchKeys.length) {
      dispatch(startedSortingTickets());

      const tickets = [...getState().queryTickets.data];

      if (switchKeys.some((el) => el === 'cheapest')) {
        tickets.sort(comparePrice);
      }

      if (switchKeys.some((el) => el === 'fastest')) {
        tickets.sort(compareDuration);
      }

      dispatch(sortedTickets(tickets));
      dispatch(changingVisibleTickets());
      dispatch(endedSortingTickets());
    }
  };
};

export default sortingTickets;
