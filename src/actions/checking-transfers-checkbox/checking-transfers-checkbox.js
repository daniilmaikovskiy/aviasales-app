import { ALL_TRANSFERS_FILTER_VALUES } from '../settings';
import filteringTickets from '../filtering-tickets/filtering-tickets';

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
    dispatch(filteringTickets());
  };
};

export default checkingTransfersCheckbox;
