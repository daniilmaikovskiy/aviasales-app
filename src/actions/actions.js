import loadingTickets from './loading-tickets/loading-tickets';
import loadingSearchId from './loading-search-id/loading-search-id';

const switchBtnPressed = (name) => {
  return {
    type: 'SWITCH_BTN_PRESSED',
    name,
  };
};

const transfersCheckboxChecked = (name) => {
  return {
    type: 'TRANSFERS_CHECKBOX_CHECKED',
    name,
  };
};

const actions = {
  switchBtnPressed,
  transfersCheckboxChecked,
  loadingSearchId,
  loadingTickets,
};

export default actions;
