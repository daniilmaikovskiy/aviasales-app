import loadingTickets from './loading-tickets/loading-tickets';
import loadingSearchId from './loading-search-id/loading-search-id';
import checkingTransfersCheckbox from './checking-transfers-checkbox/checking-transfers-checkbox';
import pressingSwitchBtn from './pressing-switch-btn/pressing-switch-btn';
import changingVisibleTickets from './changing-visible-tickets/changing-visible-tickets';

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
  changedPage,
};

export default actions;
