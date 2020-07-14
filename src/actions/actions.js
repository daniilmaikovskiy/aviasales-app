import loadingTickets from './loading-tickets/loading-tickets';
import loadingSearchId from './loading-search-id/loading-search-id';

const pressedSwitchBtn = (switchKeys) => {
  return {
    type: 'PRESSED_SWITCH_BTN',
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

const ALL_TRANSFERS_FILTER_VALUES = [
  'no-transfers',
  'one-transfer',
  'two-transfers',
  'three-transfers',
];

const isAll = (array) => {
  return (
    array.some((el) => el === 'all') ||
    ALL_TRANSFERS_FILTER_VALUES.every((el) => {
      return array.some((arrayEl) => arrayEl === el);
    })
  );
};

const getAllTransfersFilterWithoutValue = (value) => {
  return ALL_TRANSFERS_FILTER_VALUES.filter((el) => el !== value);
};

const checkedTransfersCheckbox = (filter) => {
  return {
    type: 'CHECKED_TRANSFERS_CHECKBOX',
    filter,
  };
};

const checkingTransfersCheckbox = (name) => {
  return (dispatch, getState) => {
    const transfersFilter = [...getState().transfersFilter];
    const index = transfersFilter.indexOf(name);

    if (index === -1) {
      if (transfersFilter[0] === 'all') {
        dispatch(checkedTransfersCheckbox(getAllTransfersFilterWithoutValue(name)));
        return;
      }

      transfersFilter.push(name);

      if (isAll(transfersFilter)) {
        dispatch(checkedTransfersCheckbox(['all']));
        return;
      }
    } else {
      transfersFilter.splice(index, 1);
    }

    dispatch(checkedTransfersCheckbox(transfersFilter));
  };
};

const actions = {
  pressingSwitchBtn,
  checkingTransfersCheckbox,
  loadingSearchId,
  loadingTickets,
};

export default actions;
