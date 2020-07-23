import sortingTickets from '../sorting-tickets/sorting-tickets';
import changingPage from '../changing-page/changing-page';

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
      dispatch(changingPage(1));
    }
  };
};

export default pressingSwitchBtn;
