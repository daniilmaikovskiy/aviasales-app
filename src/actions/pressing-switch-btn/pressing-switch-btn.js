import sortingTickets from '../sorting-tickets/sorting-tickets';

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
      dispatch(sortingTickets());
    }
  };
};

export default pressingSwitchBtn;
