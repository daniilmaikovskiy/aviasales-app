export default function reducer(
  state = {
    switchKeys: ['cheapest'],
  },
  action
) {
  switch (action.type) {
    case 'SWITCH_BTN_PRESSED':
      if (state.switchKeys.some((el) => el === action.name)) {
        return state;
      }

      return { ...state, switchKeys: [action.name] };
    default:
      return state;
  }
}
