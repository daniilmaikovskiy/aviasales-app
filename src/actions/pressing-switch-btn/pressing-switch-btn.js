import sortingTickets from '../sorting-tickets/sorting-tickets';
import sortingTicketsFragment from '../sorting-tickets-fragment/sorting-tickets-fragment';
import changingPage from '../changing-page/changing-page';
import filteringTickets from '../filtering-tickets/filtering-tickets';

const pressedSwitchBtn = (switchKeys) => {
  return {
    type: 'PRESSED_SWITCH_BTN',
    switchKeys,
  };
};

const pressingSwitchBtn = (name) => {
  return (dispatch, getState) => {
    const { switchKeys } = getState();
    const { stop } = getState().queryTickets;

    if (!switchKeys.some((el) => el === name)) {
      dispatch(pressedSwitchBtn([name]));

      if (stop) {
        dispatch(sortingTickets());
      } else {
        dispatch(sortingTicketsFragment());
      }

      dispatch(filteringTickets());
      dispatch(changingPage(1));
    }
  };
};

export default pressingSwitchBtn;
