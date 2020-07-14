import prepareTicket from './prepare-ticket';

const receivedTickets = (tickets, stop, maxId) => {
  return {
    type: 'RECEIVED_TICKETS',
    tickets,
    stop,
    maxId,
  };
};

const errorOfReceivingTickets = () => ({ type: 'ERROR_OF_RECEIVING_TICKETS' });

const loadingTickets = (aviasalesService, searchId) => {
  return (dispatch, getState) => {
    aviasalesService
      .getTickets(searchId)
      .then((data) => {
        const { maxId } = getState().queryTickets;
        const preparedTickets = data.tickets.map((ticket, i) => prepareTicket(ticket, maxId + i));

        dispatch(receivedTickets(preparedTickets, data.stop, maxId + preparedTickets.length));
      })
      .catch(() => dispatch(errorOfReceivingTickets()));
  };
};

export default loadingTickets;
