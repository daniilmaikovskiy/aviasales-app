import { PAGE_ITEMS_NUMBER } from '../settings';
import prepareTicket from './prepare-ticket';

const changedVisibleTickets = (tickets) => {
  return {
    type: 'CHANGED_VISIBLE_TICKETS',
    tickets,
  };
};

const changingVisibleTickets = () => {
  return (dispatch, getState) => {
    const { queryTickets, pagination } = getState();

    const visibleTickets = queryTickets.filteredTickets.slice(
      PAGE_ITEMS_NUMBER * (pagination.page - 1),
      PAGE_ITEMS_NUMBER * pagination.page
    );

    const preparedTickets = visibleTickets.map((ticket, i) =>
      prepareTicket(ticket, queryTickets.maxId + i)
    );

    dispatch(changedVisibleTickets(preparedTickets));
  };
};

export default changingVisibleTickets;
