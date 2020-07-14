import loadingTickets from './loading-tickets/loading-tickets';
import loadingSearchId from './loading-search-id/loading-search-id';
import checkingTransfersCheckbox from './checking-transfers-checkbox/checking-transfers-checkbox';
import pressingSwitchBtn from './pressing-switch-btn/pressing-switch-btn';

const PAGE_ITEMS_NUMBER = 5;

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
      PAGE_ITEMS_NUMBER * (pagination.page - 1),
      PAGE_ITEMS_NUMBER * pagination.page
    );

    dispatch(changedVisibleTickets(visibleTickets));
  };
};

const calculatedTotalPages = (totalPages) => {
  return {
    type: 'CALCULATED_TOTAL_PAGES',
    totalPages,
  };
};

const calculatingTotalPages = () => {
  return (dispatch, getState) => {
    const { data } = getState().queryTickets;
    const totalPages = Math.ceil(data.length / PAGE_ITEMS_NUMBER);

    dispatch(calculatedTotalPages(totalPages));
  };
};

const changedPage = (page) => {
  return {
    type: 'CHANGED_PAGE',
    page,
  };
};

const actions = {
  pressingSwitchBtn,
  checkingTransfersCheckbox,
  loadingSearchId,
  loadingTickets,
  changingVisibleTickets,
  calculatingTotalPages,
  changedPage,
};

export default actions;
