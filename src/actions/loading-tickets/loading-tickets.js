import prepareTicket from './prepare-ticket';
import changingVisibleTickets from '../changing-visible-tickets/changing-visible-tickets';
import calculatingTotalPages from '../calculating-total-pages/calculating-total-pages';

const receivedTickets = (tickets, stop, maxId) => {
  return {
    type: 'RECEIVED_TICKETS',
    tickets,
    stop,
    maxId,
  };
};

const errorOfReceivingTickets = () => ({ type: 'ERROR_OF_RECEIVING_TICKETS' });

const loadingTickets = (aviasalesService) => {
  return (dispatch, getState) => {
    aviasalesService
      .getTickets(getState().querySearchId.id)
      .then((data) => {
        const { maxId } = getState().queryTickets;
        const preparedTickets = data.tickets.map((ticket, i) => prepareTicket(ticket, maxId + i));

        dispatch(receivedTickets(preparedTickets, data.stop, maxId + preparedTickets.length));
        dispatch(changingVisibleTickets());
        dispatch(calculatingTotalPages());
      })
      .catch(() => dispatch(errorOfReceivingTickets()));
  };
};

export default loadingTickets;
