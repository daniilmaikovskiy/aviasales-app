import prepareTicket from './prepare-ticket';

const receivedTickets = (tickets, stop) => {
  return {
    type: 'RECEIVED_TICKETS',
    tickets,
    stop,
  };
};

const errorOfReceivingTickets = () => ({ type: 'ERROR_OF_RECEIVING_TICKETS' });

const loadingTickets = (aviasalesService, searchId) => {
  return (dispatch) => {
    aviasalesService
      .getTickets(searchId)
      .then((data) => {
        const preparedTickets = data.tickets.map((ticket) => prepareTicket(ticket));

        dispatch(receivedTickets(preparedTickets, data.stop));
      })
      .catch(() => dispatch(errorOfReceivingTickets()));
  };
};

export default loadingTickets;
