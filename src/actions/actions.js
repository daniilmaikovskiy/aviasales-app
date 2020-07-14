import loadingTickets from './loading-tickets/loading-tickets';
import loadingSearchId from './loading-search-id/loading-search-id';

const pressedSwitchBtn = (switchKeys) => {
  return {
    type: 'SWITCH_BTN_PRESSED',
    switchKeys,
  };
};

const pressingSwitchBtn = (name) => {
  return (dispatch, getState) => {
    const { switchKeys } = getState();

    if (!switchKeys.some((el) => el === name)) {
      dispatch(pressedSwitchBtn([name]));
    }
  };
};

const transfersCheckboxChecked = (name) => {
  return {
    type: 'TRANSFERS_CHECKBOX_CHECKED',
    name,
  };
};

const actions = {
  pressingSwitchBtn,
  transfersCheckboxChecked,
  loadingSearchId,
  loadingTickets,
};

export default actions;
