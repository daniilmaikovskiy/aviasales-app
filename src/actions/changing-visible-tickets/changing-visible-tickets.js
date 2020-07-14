import settings from '../settings';

const changedVisibleTickets = (tickets) => {
  return {
    type: 'CHANGED_VISIBLE_TICKETS',
    tickets,
  };
};

const changingVisibleTickets = () => {
  return (dispatch, getState) => {
    const { queryTickets, pagination } = getState();
    const visibleTickets = queryTickets.data.slice(
      settings.PAGE_ITEMS_NUMBER * (pagination.page - 1),
      settings.PAGE_ITEMS_NUMBER * pagination.page
    );

    dispatch(changedVisibleTickets(visibleTickets));
  };
};

export default changingVisibleTickets;
