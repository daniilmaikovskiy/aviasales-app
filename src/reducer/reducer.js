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

export default function reducer(
  state = {
    switchKeys: ['cheapest'],
    transfersFilter: ['one-transfer', 'two-transfers'],
  },
  action
) {
  switch (action.type) {
    case 'SWITCH_BTN_PRESSED':
      if (state.switchKeys.some((el) => el === action.name)) {
        return state;
      }

      return { ...state, switchKeys: [action.name] };
    case 'TRANSFERS_CHECKBOX_CHECKED': {
      const transfersFilter = [...state.transfersFilter];
      const index = transfersFilter.indexOf(action.name);

      if (index === -1) {
        if (transfersFilter[0] === 'all') {
          return { ...state, transfersFilter: getAllTransfersFilterWithoutValue(action.name) };
        }

        transfersFilter.push(action.name);

        if (isAll(transfersFilter)) {
          return { ...state, transfersFilter: ['all'] };
        }
      } else {
        transfersFilter.splice(index, 1);
      }

      return { ...state, transfersFilter };
    }
    default:
      return state;
  }
}
