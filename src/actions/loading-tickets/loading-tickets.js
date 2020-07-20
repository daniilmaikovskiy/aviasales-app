import calculatingTotalPages from '../calculating-total-pages/calculating-total-pages';
import sortingTickets from '../sorting-tickets/sorting-tickets';
import sortingTicketsFragment from '../sorting-tickets-fragment/sorting-tickets-fragment';
import filteringTickets from '../filtering-tickets/filtering-tickets';
import changingVisibleTickets from '../changing-visible-tickets/changing-visible-tickets';

const receivedTickets = (tickets, stop, maxId) => {
  return {
    type: 'RECEIVED_TICKETS',
    tickets,
    stop,
    maxId,
  };
};

const error404OfReceivingTickets = () => ({ type: 'ERROR_404_OF_RECEIVING_TICKETS' });

// const error500OfReceivingTickets = () => ({ type: 'ERROR_500_OF_RECEIVING_TICKETS' });

const loadingTickets = (aviasalesService) => {
  const loadingTicketsCallback = (dispatch, getState) => {
    aviasalesService
      .getTickets(getState().querySearchId.id)
      .then((data) => {
        const { maxId } = getState().queryTickets;

        const tickets = data.tickets.map((ticket, i) => {
          return {
            ...ticket,
            id: maxId + i,
            fullDuration: ticket.segments[0].duration + ticket.segments[1].duration,
          };
        });

        dispatch(receivedTickets(tickets, data.stop, maxId + tickets.length));

        if (data.stop) {
          dispatch(sortingTickets());
          dispatch(filteringTickets());
        } else {
          dispatch(filteringTickets());
          dispatch(sortingTicketsFragment());
        }

        dispatch(calculatingTotalPages());
        dispatch(changingVisibleTickets());

        if (!data.stop) {
          setTimeout(loadingTicketsCallback, 0, dispatch, getState);
        }
      })
      .catch((error) => {
        if (error.message === '404') {
          dispatch(error404OfReceivingTickets());
          return;
        }
        // if (error.message === '500') {
        //   dispatch(error500OfReceivingTickets());
        //   return;
        // }

        setTimeout(loadingTicketsCallback, 0, dispatch, getState);
      });
  };

  return loadingTicketsCallback;
};

export default loadingTickets;
