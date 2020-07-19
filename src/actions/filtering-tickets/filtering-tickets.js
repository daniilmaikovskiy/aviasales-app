import { ALL_TRANSFERS_FILTER_VALUES } from '../settings';
import changingVisibleTickets from '../changing-visible-tickets/changing-visible-tickets';
import calculatingTotalPages from '../calculating-total-pages/calculating-total-pages';

const translateTransfersFilterToNumbers = (transfersFilter) => {
  if (transfersFilter[0] === 'all') {
    return ALL_TRANSFERS_FILTER_VALUES.map((el, i) => i);
  }

  return transfersFilter.reduce((acc, el) => {
    const index = ALL_TRANSFERS_FILTER_VALUES.findIndex((findIndexEl) => el === findIndexEl);

    if (index === -1) {
      return acc;
    }

    return [...acc, index];
  }, []);
};

const isfilteredTickets = (tickets) => {
  return {
    type: 'IS_FILTERED_TICKETS',
    tickets,
  };
};

const filteringTickets = () => {
  return (dispatch, getState) => {
    const { queryTickets, transfersFilter } = getState();
    const arrayOfTransfersNumber = translateTransfersFilterToNumbers(transfersFilter);
    const filteredTickets = queryTickets.data.filter(({ segments }) => {
      {
        const isFit = arrayOfTransfersNumber.some((el) => el === segments[0].stops.length);

        if (!isFit) {
          return false;
        }
      }
      {
        const isFit = arrayOfTransfersNumber.some((el) => el === segments[1].stops.length);

        if (!isFit) {
          return false;
        }
      }

      return true;
    });

    dispatch(isfilteredTickets(filteredTickets));
    dispatch(changingVisibleTickets());
    dispatch(calculatingTotalPages());
  };
};

export default filteringTickets;
