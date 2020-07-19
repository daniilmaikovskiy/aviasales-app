import { ALL_TRANSFERS_FILTER_VALUES } from '../settings';
import filteringTickets from '../filtering-tickets/filtering-tickets';
import changingVisibleTickets from '../changing-visible-tickets/changing-visible-tickets';
import calculatingTotalPages from '../calculating-total-pages/calculating-total-pages';

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

const getNewTransfersFilter = (transfersFilter, name) => {
  const index = transfersFilter.indexOf(name);

  if (index === -1) {
    if (transfersFilter[0] === 'all') {
      return getAllTransfersFilterWithoutValue(name);
    }

    transfersFilter.push(name);

    if (isAll(transfersFilter)) {
      return ['all'];
    }
  }

  const before = transfersFilter.slice(0, index);
  const after = transfersFilter.slice(index + 1);

  return [...before, ...after];
};

const checkedTransfersCheckbox = (filter) => {
  return {
    type: 'CHECKED_TRANSFERS_CHECKBOX',
    filter,
  };
};

const checkingTransfersCheckbox = (name) => {
  return (dispatch, getState) => {
    const newTransfersFilter = getNewTransfersFilter([...getState().transfersFilter], name);

    dispatch(checkedTransfersCheckbox(newTransfersFilter));
    dispatch(filteringTickets());
    dispatch(changingVisibleTickets());
    dispatch(calculatingTotalPages());
  };
};

export default checkingTransfersCheckbox;
